import { AnimatedView } from "@/components/ui/animated-view";
import { Host } from "@/components/ui/host";
import { ItemSortOptions } from "@/constants/data";
import { useAppTheme } from "@/context/app-theme-provider";
import { useSortItems } from "@/hooks/use-sort-items";
import { ItemSortOption } from "@/types";
import ADD_ICON from "@expo/material-symbols/add.xml";
import CLOSE_ICON from "@expo/material-symbols/close.xml";
import SEARCH_ICON from "@expo/material-symbols/search.xml";
import SORT_ICON from "@expo/material-symbols/sort.xml";
import {
  BasicTextField,
  Box,
  FloatingActionButton,
  Icon,
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
import { ZoomIn, ZoomOut } from "react-native-reanimated";

export const ItemFilters = ({ options }: { options?: ItemSortOption[] }) => {
  const { colors } = useAppTheme();
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
    <>
      <Stack.Toolbar placement="bottom" backgroundColor={colors.border}>
        <Stack.Toolbar.View hidden={!showSearch}>
          <Host matchContents ignoreSafeArea="all">
            <BasicTextField
              modifiers={[
                clip(Shapes.RoundedCorner(100)),
                background(colors.background),
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
          icon={SEARCH_ICON}
          onPress={() => {
            setShowSearch(true);
          }}
        />
        <Stack.Toolbar.Button
          hidden={!showSearch}
          icon={CLOSE_ICON}
          onPress={() => {
            router.setParams({
              query: undefined,
            });
            query.value = "";
            setShowSearch(false);
          }}
        />
        <Stack.Toolbar.Menu icon={SORT_ICON}>
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
      {!showSearch ? (
        <AnimatedView
          entering={ZoomIn}
          exiting={ZoomOut.duration(100)}
          className="absolute bottom-safe-offset-4 right-safe-offset-4"
        >
          <Host matchContents>
            <FloatingActionButton onClick={() => console.log("FAB pressed")}>
              <FloatingActionButton.Icon>
                <Icon source={ADD_ICON} />
              </FloatingActionButton.Icon>
            </FloatingActionButton>
          </Host>
        </AnimatedView>
      ) : null}
    </>
  );
};
