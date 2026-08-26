import { ItemFilters } from "@/components/item/item-filters";
import { LowStockItemCard } from "@/components/item/low-stock-item-card";
import { ListEmpty } from "@/components/ui/list/list-empty";
import { ListFetchingMore } from "@/components/ui/list/list-fetching-more";
import { ListSeparator } from "@/components/ui/list/list-separator";
import { useRefreshOnFocus } from "@/hooks/use-refetch-onfocus";
import { useInfiniteLowStockItemQuery } from "@/queries/item-query";
import { ILowStockItem, ItemSortOption } from "@/types";
import { LegendList } from "@legendapp/list/react-native";
import { useLocalSearchParams } from "expo-router";
import { useCallback, useMemo, useState } from "react";
import { View } from "react-native";

const renderSeparator = () => <ListSeparator />;
const footerStyle = { padding: 10, alignItems: "center" as const };

const LowStockItemScreen = () => {
  const [refreshing, setRefreshing] = useState(false);
  const params = useLocalSearchParams();

  const {
    data,
    isPending,
    refetch,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useInfiniteLowStockItemQuery(params);

  useRefreshOnFocus(refetch);

  const lowStockItems = useMemo(
    () => (data ? data?.pages.flatMap((page) => page.content) : []),
    [data],
  );

  const renderItem = useCallback(
    ({ item }: { item: ILowStockItem }) => <LowStockItemCard item={item} />,
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

  const sortOptions: ItemSortOption[] = useMemo(() => {
    return [
      {
        label: "stock",
        value: "stock",
      },
      {
        label: "expiry_date",
        value: "exp_date",
      },
    ];
  }, []);

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
        data={lowStockItems}
        estimatedItemSize={158}
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
      <ItemFilters options={sortOptions} />
    </View>
  );
};

export default LowStockItemScreen;
