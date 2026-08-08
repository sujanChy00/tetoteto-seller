import { LineChart } from "@/components/ui/line-chart";
import { Skeleton } from "@/components/ui/skeleton";
import { ChartResponse } from "@/types";
import { View } from "react-native";

interface SalesChartProps {
  data?: ChartResponse[];
  isPending: boolean;
}

export const SalesChart = ({ isPending, data }: SalesChartProps) => {
  if (isPending)
    return (
      <View className="px-4">
        <Skeleton
          style={{
            borderRadius: 10,
            height: 250,
          }}
        />
      </View>
    );
  if (!data || data.length === 0) return null;
  return (
    <LineChart
      config={{
        gradient: true,
        height: 250,
      }}
      data={data.map((item) => ({
        x: new Date(item.day as string).toLocaleDateString("en-US", {
          weekday: "short",
        }),
        y: Number(item.orders ?? 0),
        label: new Date(item.day as string).toLocaleDateString("en-US", {
          weekday: "short",
        }),
      }))}
    />
  );
};
