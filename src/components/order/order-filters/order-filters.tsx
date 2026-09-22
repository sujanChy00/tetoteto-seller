import { AnimatedView } from "@/components/ui/animated-view";
import { GhostButton, SecondaryButton } from "@/components/ui/button";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import { InputGroup } from "@/components/ui/input-group";
import { Menu } from "@/components/ui/menu";
import { StickyKeyboardWrapper } from "@/components/ui/sticky-keyboard-wrapper";
import { StyledSymbolView } from "@/components/ui/symbol-view";
import { orderSortOptions } from "@/constants/data";
import { useLanguage } from "@/hooks/use-language";
import { dateOnlyFormatter } from "@/utils/date";
import { DateRangeSelection } from "@expo/ui/jetpack-compose";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { View } from "react-native";
import { ZoomIn, ZoomOut } from "react-native-reanimated";

export const OrderFilters = () => {
  const [isVisible, setIsVisible] = useState(false);
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
  const [date, setDate] = useState<DateRangeSelection>({
    start: startDate ? new Date(startDate) : null,
    end: endDate ? new Date(endDate) : null,
  });

  const { t } = useLanguage();
  const router = useRouter();
  const [query, setQuery] = useState(queryParam ?? "");

  return (
    <StickyKeyboardWrapper openedOffset={-70}>
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
          <View className="size-12 items-center justify-center rounded-full bg-default shadow">
            <StyledSymbolView
              name={{
                android: "sort",
                ios: "arrow.up.arrow.down",
              }}
            />
          </View>
        </Menu>
        <InputGroup className="w-auto flex-1 rounded-full pl-3 bg-default shadow">
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
        <SecondaryButton
          onPress={() => {
            setIsVisible(true);
          }}
          className="px-0 size-12 rounded-full shadow"
        >
          <StyledSymbolView name={{ android: "date_range", ios: "calendar" }} />
        </SecondaryButton>
      </View>
      <DateRangePicker
        value={date}
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        onChange={(date) => {
          router.setParams({
            startDate: dateOnlyFormatter(date.start),
            endDate: dateOnlyFormatter(date.end),
          });
          setDate(date);
        }}
      />
    </StickyKeyboardWrapper>
  );
};
