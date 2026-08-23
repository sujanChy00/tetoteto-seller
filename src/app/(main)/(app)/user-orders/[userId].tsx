import { UserOrderCard } from "@/components/order/user-order-card";
import { ListEmpty } from "@/components/ui/list/list-empty";
import { ListSeparator } from "@/components/ui/list/list-separator";
import { useRefreshOnFocus } from "@/hooks/use-refetch-onfocus";
import { useGetUserOrders } from "@/queries/order-query";
import { UserOrders } from "@/types";
import { LegendList } from "@legendapp/list/react-native";
import { useLocalSearchParams } from "expo-router";
import { useCallback, useMemo, useState } from "react";

const renderSeparator = () => <ListSeparator />;

const UserOrderScreen = () => {
  const [refreshing, setRefreshing] = useState(false);
  const { userId } = useLocalSearchParams<{ userId: string }>();
  const { data, isPending, refetch } = useGetUserOrders({
    userId: Number(userId),
  });

  useRefreshOnFocus(refetch);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetch().finally(() => setRefreshing(false));
  }, [refetch]);

  const ListEmptyComponent = useCallback(
    () => <ListEmpty isPending={isPending} />,
    [isPending],
  );

  const keyExtractor = useCallback(({ id }: UserOrders) => id.toString(), []);

  const renderItem = useCallback(
    ({ item }: { item: UserOrders }) => <UserOrderCard order={item} />,
    [],
  );

  const orders = useMemo(() => data ?? [], [data]);

  return (
    <LegendList
      recycleItems
      maintainVisibleContentPosition
      showsVerticalScrollIndicator={false}
      contentContainerClassName="p-2 pb-safe-offset-10"
      drawDistance={500}
      keyboardDismissMode="on-drag"
      onEndReachedThreshold={0.5}
      estimatedItemSize={195}
      data={orders}
      ItemSeparatorComponent={renderSeparator}
      renderItem={renderItem}
      refreshing={refreshing}
      keyExtractor={keyExtractor}
      onRefresh={onRefresh}
      ListEmptyComponent={ListEmptyComponent}
    />
  );
};

export default UserOrderScreen;
