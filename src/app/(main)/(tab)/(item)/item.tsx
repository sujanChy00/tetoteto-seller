import { ItemCard } from "@/components/item/item-card";
import { ItemFilters } from "@/components/item/item-filters";
import { ListEmpty } from "@/components/ui/list/list-empty";
import { ListFetchingMore } from "@/components/ui/list/list-fetching-more";
import { ListSeparator } from "@/components/ui/list/list-separator";
import { useRefreshOnFocus } from "@/hooks/use-refetch-onfocus";
import { useInfiniteItemQuery } from "@/queries/item-query";
import { IItem } from "@/types";
import { LegendList } from "@legendapp/list/react-native";
import { useLocalSearchParams } from "expo-router";
import { useCallback, useMemo, useState } from "react";
import { View } from "react-native";

const renderSeparator = () => <ListSeparator />;
const footerStyle = { padding: 10, alignItems: "center" as const };

const ItemScreen = () => {
  const [refreshing, setRefreshing] = useState(false);
  const params = useLocalSearchParams<{
    query?: string;
    sort?: string;
    order?: string;
  }>();

  const {
    data,
    isPending,
    refetch,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useInfiniteItemQuery(params);

  useRefreshOnFocus(refetch);

  const allItems = useMemo(
    () => (data ? data?.pages.flatMap((page) => page.content) : []),
    [data],
  );

  const renderItem = useCallback(
    ({ item }: { item: IItem }) => <ItemCard item={item} />,
    [],
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetch().finally(() => setRefreshing(false));
  }, [refetch]);

  const keyExtractor = useCallback(
    ({ item_id, item_name, item_delivery_time }: IItem) =>
      item_id.toString() +
      item_name.toString() +
      item_delivery_time?.toString(),
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
        estimatedItemSize={140}
        keyboardDismissMode="on-drag"
        onEndReachedThreshold={0.5}
        data={allItems}
        ItemSeparatorComponent={renderSeparator}
        renderItem={renderItem}
        refreshing={refreshing}
        keyExtractor={keyExtractor}
        onRefresh={onRefresh}
        ListEmptyComponent={ListEmptyComponent}
        onEndReached={onEndReached}
        ListFooterComponentStyle={footerStyle}
        ListFooterComponent={ListFooterComponent}
      />
      <ItemFilters />
    </View>
  );
};

export default ItemScreen;
