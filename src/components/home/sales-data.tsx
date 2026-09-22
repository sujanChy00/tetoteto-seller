import { useRefreshOnFocus } from "@/hooks/use-refetch-onfocus";
import { useGetSalesData } from "@/queries/home-query";
import {
  dateOnlyFormatter,
  endOfMonth,
  formatShortDate,
  startOfMonth,
} from "@/utils/date";
import { formatCurrency } from "@/utils/format-currency";
import { DateRangeSelection } from "@expo/ui/jetpack-compose";
import { useState } from "react";
import { View } from "react-native";
import { SecondaryButton } from "../ui/button";
import { DateRangePicker } from "../ui/date-range-picker";
import { Surface } from "../ui/surface";
import { ThemedText } from "../ui/themed-text";

export const SalesData = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [date, setDate] = useState<DateRangeSelection>({
    end: endOfMonth(new Date()),
    start: startOfMonth(new Date()),
  });

  const { data, isPending, refetch } = useGetSalesData({
    from: dateOnlyFormatter(date.start!) ?? "",
    to: dateOnlyFormatter(date.end!) ?? "",
  });

  useRefreshOnFocus(refetch);

  return (
    <View className="gap-6">
      <View className="flex-row items-center justify-between">
        <ThemedText className="font-semibold text-muted">
          Monthly Overview
        </ThemedText>
        <SecondaryButton
          onPress={() => setIsVisible(true)}
          className="h-8.75 px-3"
        >
          <SecondaryButton.Label>
            {date.start && date.end
              ? `${formatShortDate(new Date(date.start))} - ${formatShortDate(new Date(date.end))}`
              : "Select Date"}
          </SecondaryButton.Label>
        </SecondaryButton>
        <DateRangePicker
          setIsVisible={setIsVisible}
          isVisible={isVisible}
          value={date}
          onChange={setDate}
        />
      </View>
      <View className="flex-row items-center gap-6">
        <Surface className="border-separator/50 flex-1 border gap-0.5">
          <ThemedText className="text-muted text-[10px] font-serif font-bold uppercase">
            Total Orders
          </ThemedText>
          <ThemedText className="font-semibold text-lg">
            {isPending ? "..." : data?.totalOrderCount}
          </ThemedText>
        </Surface>
        <Surface className="border-separator/50 flex-1 border">
          <ThemedText className="text-muted text-[10px] font-serif font-bold uppercase">
            Total Revenue
          </ThemedText>
          <ThemedText className="font-semibold text-lg">
            ¥
            {isPending
              ? "..."
              : formatCurrency(Number(data?.totalRevenue || "0"))}
          </ThemedText>
        </Surface>
      </View>
    </View>
  );
};
