import { AnimatedView } from "@/components/ui/animated-view";
import { GhostButton } from "@/components/ui/button";
import { Host } from "@/components/ui/host";
import { InputGroup } from "@/components/ui/input-group";
import { StickyButtonWrapper } from "@/components/ui/sticky-button-wrapper";
import { ItemSortOptions } from "@/constants/data";
import { useKeyboard } from "@/hooks/use-keyboard";
import { useSortItems } from "@/hooks/use-sort-items";
import { ItemSortOption } from "@/types";
import ADD_ICON from "@expo/material-symbols/add.xml";
import ARROW_DOWN from "@expo/material-symbols/arrow_downward_alt.xml";
import ARROW_UP from "@expo/material-symbols/arrow_upward_alt.xml";
import SORT_ICON from "@expo/material-symbols/sort.xml";
import {
  DropdownMenu,
  DropdownMenuItem,
  FilledTonalIconButton,
  Icon,
  Text,
} from "@expo/ui/jetpack-compose";
import { size } from "@expo/ui/jetpack-compose/modifiers";
import { SymbolView } from "expo-symbols";
import { useMemo, useState } from "react";
import { View } from "react-native";
import { ZoomIn, ZoomOut } from "react-native-reanimated";
import { twMerge } from "tailwind-merge";

interface ItemFiltersProps {
  showSearch?: boolean;
  options?: ItemSortOption[];
}

export const ItemFilters = ({
  showSearch = false,
  options,
}: ItemFiltersProps) => {
  const { dismissKeyboard } = useKeyboard();
  const { onSort, params, router } = useSortItems();
  const [isExpanded, setIsExpanded] = useState(false);
  const [query, setQuery] = useState(params.query ?? "");

  const sortOptions = useMemo(() => options || ItemSortOptions, [options]);

  return (
    <StickyButtonWrapper openedOffset={-70}>
      <View
        className={twMerge(
          "flex-row items-center gap-3",
          showSearch ? "justify-between" : "justify-end",
        )}
      >
        <Host matchContents>
          <DropdownMenu
            expanded={isExpanded}
            onDismissRequest={() => {
              dismissKeyboard();
              setIsExpanded(false);
            }}
          >
            <DropdownMenu.Trigger>
              <FilledTonalIconButton
                modifiers={[size(50, 50)]}
                onClick={() => setIsExpanded(true)}
              >
                <Icon source={SORT_ICON} />
              </FilledTonalIconButton>
            </DropdownMenu.Trigger>
            <DropdownMenu.Items>
              {sortOptions.map((item) => (
                <DropdownMenuItem
                  key={item.value + params.sort}
                  onClick={() => {
                    onSort(item.value);
                  }}
                >
                  <DropdownMenuItem.Text>
                    <Text>{item.label}</Text>
                  </DropdownMenuItem.Text>
                  {params.sort === item.value && (
                    <DropdownMenuItem.TrailingIcon>
                      <Icon
                        source={params.order === "0" ? ARROW_UP : ARROW_DOWN}
                      />
                    </DropdownMenuItem.TrailingIcon>
                  )}
                </DropdownMenuItem>
              ))}
            </DropdownMenu.Items>
          </DropdownMenu>
        </Host>
        {showSearch ? (
          <InputGroup className="w-auto flex-1 rounded-full pl-3 bg-default">
            <InputGroup.Input
              placeholder="search..."
              returnKeyType="done"
              value={query}
              onChangeText={setQuery}
              onSubmitEditing={() => {
                router.setParams({
                  query: query.trim(),
                });
              }}
            />
            {!!query.trim() ? (
              <AnimatedView entering={ZoomIn} exiting={ZoomOut}>
                <InputGroup.Suffix className="px-0">
                  <GhostButton
                    className="size-9 p-0"
                    onPress={() => {
                      setQuery("");
                      if (!!params.query) {
                        router.setParams({
                          query: "",
                        });
                      }
                    }}
                  >
                    <SymbolView
                      name={{
                        android: "close",
                      }}
                    />
                  </GhostButton>
                </InputGroup.Suffix>
              </AnimatedView>
            ) : null}
          </InputGroup>
        ) : null}
        <Host matchContents>
          <FilledTonalIconButton
            onClick={() => {
              router.push({
                pathname: "/item/add",
              });
            }}
            modifiers={[size(50, 50)]}
          >
            <Icon source={ADD_ICON} />
          </FilledTonalIconButton>
        </Host>
      </View>
    </StickyButtonWrapper>
  );
};
