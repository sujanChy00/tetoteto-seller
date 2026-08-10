import { ItemSortOptions } from "@/constants/data";
import { useSortItems } from "@/hooks/use-sort-items";
import { ItemSortOption } from "@/types";
import Close from "@expo/material-symbols/close.xml";
import Search from "@expo/material-symbols/search.xml";
import Sort from "@expo/material-symbols/sort.xml";
import {
  BasicTextField,
  Box,
  Host,
  Text,
  useNativeState,
} from "@expo/ui/jetpack-compose";
import {
  background,
  clip,
  height,
  padding,
  Shapes,
  width,
} from "@expo/ui/jetpack-compose/modifiers";
import { Stack } from "expo-router";
import { useCallback, useMemo, useState } from "react";

export const ItemFilters = ({ options }: { options?: ItemSortOption[] }) => {
  const { onSort, params, router } = useSortItems();
  const [showSearch, setShowSearch] = useState(false);
  const query = useNativeState(params.query ?? "");
  const handleValueChange = useCallback(
    (value: string) => {
      "worklet";
      query.value = value.trimStart();
    },
    [query],
  );

  const sortOptions = useMemo(() => options || ItemSortOptions, [options]);

  return (
    <Stack.Toolbar>
      <Stack.Toolbar.View hidden={!showSearch}>
        <Host matchContents ignoreSafeAreaKeyboardInsets>
          <BasicTextField
            modifiers={[
              clip(Shapes.RoundedCorner(100)),
              background("#FFFFFF"),
              height(40),
              width(200),
              padding(12, 0, 12, 0),
            ]}
            value={query}
            onValueChange={handleValueChange}
            keyboardOptions={{
              imeAction: "search",
            }}
            keyboardActions={{
              onSearch: () => {
                router.setParams({
                  query: query.value,
                });
                query.value = "";
                setShowSearch(false);
              },
            }}
          >
            <BasicTextField.DecorationBox>
              <Box contentAlignment="centerStart">
                <BasicTextField.Placeholder>
                  <Text color="#9ca3af">Search…</Text>
                </BasicTextField.Placeholder>
                <BasicTextField.InnerTextField />
              </Box>
            </BasicTextField.DecorationBox>
          </BasicTextField>
        </Host>
      </Stack.Toolbar.View>
      <Stack.Toolbar.Button
        hidden={showSearch}
        icon={Search}
        onPress={() => {
          setShowSearch(true);
        }}
      />
      <Stack.Toolbar.Button
        hidden={!showSearch}
        icon={Close}
        onPress={() => {
          router.setParams({
            query: undefined,
          });
          query.value = "";
          setShowSearch(false);
        }}
      />
      <Stack.Toolbar.Menu icon={Sort}>
        {sortOptions.map((opt) => (
          <Stack.Toolbar.MenuAction
            isOn={opt.value === params.sort}
            key={opt.value}
            onPress={() => {
              onSort(opt.value);
            }}
          >
            {opt.label}
          </Stack.Toolbar.MenuAction>
        ))}
      </Stack.Toolbar.Menu>
    </Stack.Toolbar>
  );
};
