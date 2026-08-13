import { HomeLinks } from "@/components/home/home-links";
import { SalesChart } from "@/components/home/sales-chart";
import { SalesData } from "@/components/home/sales-data";
import { ShopSelector } from "@/components/layout/shop-selector";
import { useGetHomeData } from "@/queries/home-query";
import { useState } from "react";
import { RefreshControl, ScrollView, View } from "react-native";

export default function Index() {
  const [refreshing, setRefreshing] = useState(false);
  const { data, isPending, isRefetching, refetch } = useGetHomeData();

  const isLoading = isPending || isRefetching;

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentInsetAdjustmentBehavior="automatic"
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={() => {
            setRefreshing(true);
            refetch().finally(() => setRefreshing(false));
          }}
        />
      }
      contentContainerClassName="py-safe-offset-14"
    >
      <ShopSelector />
      <View className="px-2 pt-6 gap-6">
        <SalesData />
        <HomeLinks />
        <SalesChart isPending={isLoading} data={data?.weeklySales} />
      </View>
    </ScrollView>
  );
}
