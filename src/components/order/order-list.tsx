import { useGetOrderTypeIcon } from "@/hooks/use-get-order-type-icon";
import { useRefreshOnFocus } from "@/hooks/use-refetch-onfocus";
import { useGetAllOrdersInfiniteQuery } from "@/queries/order-query";
import { IOrderProgress, ITransactionContent } from "@/types";
import { LegendList } from "@legendapp/list/react-native";
import { useLocalSearchParams } from "expo-router";
import { useCallback, useMemo, useState } from "react";
import { ListEmpty } from "../ui/list/list-empty";
import { ListFetchingMore } from "../ui/list/list-fetching-more";
import { ListSeparator } from "../ui/list/list-separator";
import { OrderCard } from "./order-card";
import { OrderFilterResultText } from "./order-filter-result-text";

interface Props {
  status?: IOrderProgress | "all";
  orderType?: "all";
}

const renderSeparator = () => <ListSeparator />;
const footerStyle = { padding: 10, alignItems: "center" as const };

export const OrderList = ({ orderType, status }: Props) => {
  const { transactionTypeIcon } = useGetOrderTypeIcon();

  const [refreshing, setRefreshing] = useState(false);
  const params = useLocalSearchParams<{
    orderStatus?: string;
    startDate?: string;
    endDate?: string;
    query?: string;
  }>();
  const {
    data,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isPending,
    refetch,
  } = useGetAllOrdersInfiniteQuery({
    size: 30,
    sortBy: params?.orderStatus || status,
    from: params?.startDate,
    to: params.endDate,
    orderId: params?.query,
  });

  useRefreshOnFocus(refetch);
  const orders = useMemo(
    () => (data ? data?.pages.flatMap((page) => page.content) : []),
    [data],
  );

  const keyExtractor = useCallback(
    ({ orderId }: ITransactionContent) => orderId.toString(),
    [],
  );

  const renderItem = useCallback(
    ({ item }: { item: ITransactionContent }) => (
      <OrderCard order={item} transactionTypeIcon={transactionTypeIcon} />
    ),
    [transactionTypeIcon],
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetch().finally(() => setRefreshing(false));
  }, [refetch]);

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

  const ListHeaderComponent = useMemo(
    () =>
      orderType === "all" ? (
        <OrderFilterResultText totalItems={orders?.length || 0} />
      ) : null,
    [orderType],
  );

  return (
    <LegendList
      recycleItems
      ListHeaderComponent={ListHeaderComponent}
      maintainVisibleContentPosition
      showsVerticalScrollIndicator={false}
      contentContainerClassName="p-2"
      drawDistance={500}
      keyboardDismissMode="on-drag"
      onEndReachedThreshold={0.5}
      data={orders}
      estimatedItemSize={264}
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
  );
};
