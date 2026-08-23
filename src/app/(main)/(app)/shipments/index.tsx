import { ShipmentCard } from "@/components/shipments/shipment-card";
import { ShipmentFilters } from "@/components/shipments/shipment-filters";
import { FabButton } from "@/components/ui/fab-button";
import { ListEmpty } from "@/components/ui/list/list-empty";
import { ListFetchingMore } from "@/components/ui/list/list-fetching-more";
import { ListSeparator } from "@/components/ui/list/list-separator";
import { useRefreshOnFocus } from "@/hooks/use-refetch-onfocus";
import { useGetAllShipmentsInfiniteQuery } from "@/queries/order-query";
import { OrderTrackingResponse } from "@/types";
import { LegendList } from "@legendapp/list/react-native";
import { useLocalSearchParams } from "expo-router";
import { useCallback, useMemo, useState } from "react";
import { View } from "react-native";

const renderSeparator = () => <ListSeparator />;
const footerStyle = { padding: 10, alignItems: "center" as const };

const Shipments = () => {
  const [refreshing, setRefreshing] = useState(false);
  const params = useLocalSearchParams<{
    filter?: string;
  }>();

  const {
    data,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isPending,
    refetch,
  } = useGetAllShipmentsInfiniteQuery({
    filter: params?.filter || "current",
  });

  useRefreshOnFocus(refetch);

  const shipments = useMemo(
    () => (data ? data?.pages.flatMap((page) => page.content) : []),
    [data],
  );
  const renderItem = useCallback(
    ({ item }: { item: OrderTrackingResponse }) => (
      <ShipmentCard shipment={item} />
    ),
    [],
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetch().finally(() => setRefreshing(false));
  }, [refetch]);

  const keyExtractor = useCallback(
    ({ orderId }: OrderTrackingResponse) => orderId.toString(),
    [],
  );
  const ListEmptyComponent = useCallback(
    () => <ListEmpty isPending={isPending} />,
    [isPending],
  );

  const ListFooterComponent = useCallback(
    () => (
      <ListFetchingMore
        isFetchingNextPage={isFetchingNextPage}
        hasNextPage={hasNextPage}
      />
    ),
    [isFetchingNextPage, hasNextPage],
  );

  const onEndReached = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) fetchNextPage();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <View className="flex-1">
      <LegendList
        recycleItems
        maintainVisibleContentPosition
        showsVerticalScrollIndicator={false}
        contentContainerClassName="p-2"
        drawDistance={500}
        keyboardDismissMode="on-drag"
        onEndReachedThreshold={0.5}
        data={shipments}
        estimatedItemSize={280}
        ItemSeparatorComponent={renderSeparator}
        renderItem={renderItem}
        refreshing={refreshing}
        keyExtractor={keyExtractor}
        onRefresh={onRefresh}
        ListEmptyComponent={ListEmptyComponent}
        onEndReached={onEndReached}
        ListFooterComponentStyle={footerStyle}
        ListFooterComponent={ListFooterComponent}
        experimental_adaptiveRender={{
          enterVelocity: 6,
          exitVelocity: 3,
          exitDelay: 250,
        }}
      />
      <FabButton>
        <ShipmentFilters />
      </FabButton>
    </View>
  );
};

export default Shipments;
