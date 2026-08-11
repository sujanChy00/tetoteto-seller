import { LineChart } from "@/components/ui/line-chart";
import { Skeleton } from "@/components/ui/skeleton";
import { ChartResponse } from "@/types";

interface SalesChartProps {
  data?: ChartResponse[];
  isPending: boolean;
}

export const SalesChart = ({ isPending, data }: SalesChartProps) => {
  if (isPending)
    return (
      <Skeleton
        style={{
          borderRadius: 24,
          height: 250,
        }}
      />
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
