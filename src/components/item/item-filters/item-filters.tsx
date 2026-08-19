import { AnimatedView } from "@/components/ui/animated-view";
import { GhostButton, SecondaryButton } from "@/components/ui/button";
import { InputGroup } from "@/components/ui/input-group";
import { Menu } from "@/components/ui/menu";
import { StickyButtonWrapper } from "@/components/ui/sticky-button-wrapper";
import { ItemSortOptions } from "@/constants/data";
import { useSortItems } from "@/hooks/use-sort-items";
import { ItemSortOption } from "@/types";
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
  const { onSort, params, router } = useSortItems();
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
        <Menu
          nativeOptions={sortOptions.map((item) => ({
            title: item.label,
            id: item.value,
            state: params.sort === item.value ? "on" : "off",
          }))}
          onValueChange={(v) => {
            onSort(v);
          }}
        >
          <View className="size-12 items-center justify-center rounded-full bg-default">
            <SymbolView
              name={{
                android: "sort",
                ios: "arrow.up.arrow.down",
              }}
            />
          </View>
        </Menu>

        {showSearch ? (
          <InputGroup className="w-auto flex-1 rounded-full pl-3 bg-default">
            <InputGroup.Input
              placeholder="search..."
              returnKeyType="done"
              placeholderTextColorClassName="dark:accent-foreground"
              value={query}
              onChangeText={(text) => {
                setQuery(text);
                if (!text.trim()) {
                  router.setParams({ query: "" });
                }
              }}
              onSubmitEditing={() => {
                setQuery(query.trim());
                router.setParams({ query: query.trim() });
              }}
            />
            {!!query?.trim() ? (
              <AnimatedView entering={ZoomIn} exiting={ZoomOut}>
                <InputGroup.Suffix className="pr-1.5">
                  <GhostButton
                    className="size-9 p-0"
                    onPress={() => {
                      setQuery("");
                      if (!!query) {
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
        <SecondaryButton
          onPress={() => {
            router.push({
              pathname: "/item/add",
            });
          }}
          className="px-0 size-12 rounded-full"
        >
          <SymbolView name={{ android: "add", ios: "plus" }} />
        </SecondaryButton>
      </View>
    </StickyButtonWrapper>
  );
};
