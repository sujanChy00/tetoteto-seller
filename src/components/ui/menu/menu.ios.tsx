import { DropdownMenuProps } from "@/types/components";
import { Button, Menu as UIMenu } from "@expo/ui/swift-ui";
import {
  buttonStyle,
  disabled as disabledModifier,
} from "@expo/ui/swift-ui/modifiers";

export const Menu = ({
  IOSSystemImage,
  options,
  disabled,
  onSelect,
  placeholder,
  value,
  customLabel,
}: DropdownMenuProps) => {
  const selectedLabel = options.find((option) => option.value === value)?.label;

  return (
    <UIMenu
      label={customLabel ?? selectedLabel ?? placeholder}
      systemImage={IOSSystemImage ?? "chevron.up.chevron.down"}
      modifiers={[
        buttonStyle("glass"),
        ...(disabled ? [disabledModifier(true)] : []),
      ]}
    >
      {options.map((option, index) => (
        <Button
          key={index}
          modifiers={disabled ? [disabledModifier(true)] : []}
          role={option.IOSRole}
          systemImage={option.IOSSystemImage}
          label={option.label}
          onPress={() => onSelect?.(option.value)}
        />
      ))}
    </UIMenu>
  );
};
