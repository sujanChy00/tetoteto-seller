import { useAppTheme } from "@/context/app-theme-provider";
import { DropdownMenuProps } from "@/types/components";
import CHEVRON_UP_DOWN from "@expo/material-symbols/unfold_more.xml";
import { Icon, Text } from "@expo/ui";
import {
  DropdownMenu,
  DropdownMenuItem,
  TextButton,
} from "@expo/ui/jetpack-compose";
import { useState } from "react";
import { Row } from "../row";

export const Menu = ({
  options,
  onSelect,
  placeholder,
  value,
  disabled = false,
  customLabel,
  androidIcon,
}: DropdownMenuProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { colors } = useAppTheme();
  const selectedLabel = options.find((option) => option.value === value)?.label;
  return (
    <DropdownMenu
      expanded={isExpanded}
      onDismissRequest={() => setIsExpanded(false)}
    >
      <DropdownMenu.Trigger>
        <TextButton enabled={!disabled} onClick={() => setIsExpanded(true)}>
          {customLabel ?? (
            <Row alignment="center">
              <Text
                textStyle={{
                  color: colors.primary as string,
                }}
              >
                {selectedLabel ?? placeholder}
              </Text>
              <Icon
                name={androidIcon ?? CHEVRON_UP_DOWN}
                size={20}
                color={colors.primary}
              />
            </Row>
          )}
        </TextButton>
      </DropdownMenu.Trigger>
      <DropdownMenu.Items>
        {options.map((item) => (
          <DropdownMenuItem
            enabled={!item.disabled}
            key={item.value}
            onClick={() => {
              onSelect?.(item.value);
              setIsExpanded(false);
            }}
          >
            {item.leadingIcon && (
              <DropdownMenuItem.LeadingIcon>
                {item.leadingIcon}
              </DropdownMenuItem.LeadingIcon>
            )}
            <DropdownMenuItem.Text>
              <Text>{item.label}</Text>
            </DropdownMenuItem.Text>
            {item.trailingIcon && (
              <DropdownMenuItem.TrailingIcon>
                {item.trailingIcon}
              </DropdownMenuItem.TrailingIcon>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenu.Items>
    </DropdownMenu>
  );
};
