import { ItemSortOptions } from "@/constants/data";
import { useSortItems } from "@/hooks/use-sort-items";
import { ItemSortOption } from "@/types";
import { Stack } from "expo-router";
import { useCallback, useMemo, useState } from "react";

export const ItemFilters = ({ options }: { options?: ItemSortOption[] }) => {
  const { onSort, params, router } = useSortItems();
  const [showSearch, setShowSearch] = useState(false);
  const [searchText, setSearchText] = useState(params.query ?? "");

  const sortOptions = useMemo(() => options || ItemSortOptions, [options]);

  const handleSearchButtonPress = useCallback(
    (text: string) => {
      router.setParams({ query: text || undefined });
      setShowSearch(false);
    },
    [router],
  );

  return (
    <>
      <Stack.SearchBar
        placeholder="Search…"
        autoCapitalize="none"
        onChangeText={(event) => {
          setSearchText(event.nativeEvent.text);
        }}
        onSearchButtonPress={() => handleSearchButtonPress(searchText)}
      />
      <Stack.Toolbar placement="bottom">
        <Stack.Toolbar.SearchBarSlot separateBackground hidden={!showSearch} />
        <Stack.Toolbar.Spacer />
        <Stack.Toolbar.Button
          hidden={showSearch}
          icon="magnifyingglass"
          onPress={() => setShowSearch(true)}
        />
        <Stack.Toolbar.Button
          hidden={!showSearch}
          icon="xmark"
          onPress={() => {
            router.setParams({ query: undefined });
            setShowSearch(false);
          }}
        />
        <Stack.Toolbar.Menu icon="arrow.up.arrow.down">
          {sortOptions.map((opt) => {
            const isActive = opt.value === params.sort;
            return (
              <Stack.Toolbar.MenuAction
                key={opt.value}
                isOn={isActive}
                icon={
                  isActive
                    ? params.order === "0"
                      ? "arrow.down"
                      : "arrow.up"
                    : undefined
                }
                onPress={() => onSort(opt.value)}
              >
                {opt.label}
              </Stack.Toolbar.MenuAction>
            );
          })}
        </Stack.Toolbar.Menu>
        <Stack.Toolbar.Button icon={"plus"} />
      </Stack.Toolbar>
    </>
  );
};
