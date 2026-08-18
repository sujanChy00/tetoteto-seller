import { ExpiredItemCard } from "@/components/item/expired-item-card";
import { ItemFilters } from "@/components/item/item-filters";
import { ListEmpty } from "@/components/ui/list/list-empty";
import { ListFetchingMore } from "@/components/ui/list/list-fetching-more";
import { ListSeparator } from "@/components/ui/list/list-separator";
import { useRefreshOnFocus } from "@/hooks/use-refetch-onfocus";
import { useInfiniteExpiredItemQuery } from "@/queries/item-query";
import { ILowStockItem } from "@/types";
import { LegendList } from "@legendapp/list/react-native";
import { useLocalSearchParams } from "expo-router";
import { useCallback, useMemo, useState } from "react";
import { View } from "react-native";

const renderSeparator = () => <ListSeparator />;
const footerStyle = { padding: 10, alignItems: "center" as const };

const ExpiredItemScreen = () => {
  const [refreshing, setRefreshing] = useState(false);
  const params = useLocalSearchParams();

  const {
    data,
    isPending,
    refetch,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useInfiniteExpiredItemQuery(params);

  useRefreshOnFocus(refetch);

  const expiredItems = useMemo(
    () => (data ? data?.pages.flatMap((page) => page.content) : []),
    [data],
  );

  const renderItem = useCallback(
    ({ item }: { item: ILowStockItem }) => <ExpiredItemCard item={item} />,
    [],
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetch().finally(() => setRefreshing(false));
  }, [refetch]);

  const keyExtractor = useCallback(
    ({ itemId }: ILowStockItem) => itemId.toString(),
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
        data={expiredItems}
        estimatedItemSize={98}
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
      <ItemFilters />
    </View>
  );
};

export default ExpiredItemScreen;
