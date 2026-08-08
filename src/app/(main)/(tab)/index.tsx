import { ShopSelector } from "@/components/layout/shop-selector";
import { useLogoutMutation } from "@/mutation/auth-mutation";
import { useGetHomeData } from "@/queries/home-query";
import { useState } from "react";
import { Button, RefreshControl, ScrollView } from "react-native";

export default function Index() {
  const { mutate: logout } = useLogoutMutation();
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
      contentContainerClassName="py-safe-offset-8"
    >
      <ShopSelector />
      <Button
        title="logout"
        onPress={() => {
          logout();
        }}
      />
    </ScrollView>
  );
}
