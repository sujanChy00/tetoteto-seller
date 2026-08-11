import { useRefreshOnFocus } from "@/hooks/use-refetch-onfocus";
import { useGetSalesData } from "@/queries/home-query";
import { dateOnlyFormatter, endOfMonth, startOfMonth } from "@/utils/date";
import { formatCurrency } from "@/utils/format-currency";
import { useState } from "react";
import { View } from "react-native";
import { DateType } from "react-native-ui-datepicker";
import { DateRangePicker } from "../ui/date-range-picker";
import { Surface } from "../ui/surface";
import { ThemedText } from "../ui/themed-text";

export const SalesData = () => {
  const [date, setDate] = useState<{
    endDate?: DateType;
    startDate?: DateType;
  }>({
    endDate: endOfMonth(new Date()),
    startDate: startOfMonth(new Date()),
  });

  const { data, isPending, refetch } = useGetSalesData({
    from: dateOnlyFormatter(new Date(date.startDate as string)) as string,
    to: dateOnlyFormatter(new Date(date.endDate as string)) as string,
  });

  useRefreshOnFocus(refetch);

  return (
    <View className="gap-6">
      <View className="flex-row items-center justify-between gap-6">
        <ThemedText className="font-semibold text-muted">
          Monthly Overview
        </ThemedText>
        <DateRangePicker value={date} onChange={setDate} />
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
