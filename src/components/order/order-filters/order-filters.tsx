import { AnimatedView } from "@/components/ui/animated-view";
import { GhostButton, SecondaryButton } from "@/components/ui/button";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { InputGroup } from "@/components/ui/input-group";
import { Menu } from "@/components/ui/menu";
import { StickyButtonWrapper } from "@/components/ui/sticky-button-wrapper";
import { StyledSymbolView } from "@/components/ui/symbol-view";
import { orderSortOptions } from "@/constants/data";
import { useLanguage } from "@/hooks/use-language";
import { dateOnlyFormatter, endOfMonth, startOfMonth } from "@/utils/date";
import { BottomSheetModal } from "@expo/ui/community/bottom-sheet";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useRef, useState } from "react";
import { View } from "react-native";
import { ZoomIn, ZoomOut } from "react-native-reanimated";

export const OrderFilters = () => {
  const {
    endDate,
    orderStatus,
    startDate,
    query: queryParam,
  } = useLocalSearchParams<{
    startDate?: string;
    endDate?: string;
    orderStatus?: string;
    query?: string;
  }>();
  const { t } = useLanguage();
  const router = useRouter();
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const [query, setQuery] = useState(queryParam ?? "");

  const onOpen = useCallback(() => {
    bottomSheetRef.current?.present();
  }, []);

  return (
    <StickyButtonWrapper openedOffset={-70}>
      <View className={"flex-row items-center gap-3 justify-between"}>
        <Menu
          nativeOptions={orderSortOptions.map((item) => ({
            title: t(item.label),
            id: item.value,
            state: orderStatus === item.value ? "on" : "off",
          }))}
          onValueChange={(v) => {
            router.setParams({
              orderStatus: v,
            });
          }}
        >
          <View className="size-12 items-center justify-center rounded-full bg-default">
            <StyledSymbolView
              name={{
                android: "sort",
                ios: "arrow.up.arrow.down",
              }}
            />
          </View>
        </Menu>
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
          {!!query.trim() ? (
            <AnimatedView entering={ZoomIn} exiting={ZoomOut}>
              <InputGroup.Suffix className="pr-1.5">
                <GhostButton
                  className="size-9 p-0"
                  onPress={() => {
                    setQuery("");
                    if (!!queryParam) {
                      router.setParams({
                        query: "",
                      });
                    }
                  }}
                >
                  <StyledSymbolView
                    name={{
                      android: "close",
                    }}
                  />
                </GhostButton>
              </InputGroup.Suffix>
            </AnimatedView>
          ) : null}
        </InputGroup>
        <SecondaryButton onPress={onOpen} className="px-0 size-12 rounded-full">
          <StyledSymbolView name={{ android: "date_range", ios: "calendar" }} />
        </SecondaryButton>
      </View>
      <DateRangePicker
        value={{
          startDate: startDate ? startOfMonth(new Date(startDate)) : undefined,
          endDate: endDate ? endOfMonth(new Date(endDate)) : undefined,
        }}
        onChange={(data) => {
          router.setParams({
            startDate: dateOnlyFormatter(
              new Date(data.startDate as string),
            ) as string,
            endDate: dateOnlyFormatter(
              new Date(data.endDate as string),
            ) as string,
          });
        }}
        bottomSheetRef={bottomSheetRef}
      />
    </StickyButtonWrapper>
  );
};
