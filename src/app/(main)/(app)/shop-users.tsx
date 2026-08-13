import { ShopUserCard } from "@/components/shop-users/shop-user-card";
import { ListEmpty } from "@/components/ui/list/list-empty";
import { ListFooter } from "@/components/ui/list/list-footer";
import { ListSeparator } from "@/components/ui/list/list-separator";
import { useResponsiveListColumns } from "@/hooks/use-responsive-list-columns";
import { useGetAllShopUsers } from "@/queries/shop-query";
import { IShopUser } from "@/types";
import { AnimatedLegendList } from "@legendapp/list/reanimated";
import { useCallback, useMemo, useState } from "react";
import { LinearTransition } from "react-native-reanimated";

const renderSeparator = () => <ListSeparator />;

const ShopUserScreen = () => {
  const { numColumns } = useResponsiveListColumns();
  const [refreshing, setRefreshing] = useState(false);
  const { data, isPending, refetch } = useGetAllShopUsers();

  const shopUsers = useMemo(() => data || [], [data]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetch().finally(() => setRefreshing(false));
  }, [refetch]);

  const renderItem = useCallback(
    ({ item }: { item: IShopUser }) => <ShopUserCard data={item} />,
    [],
  );
  const keyExtractor = useCallback(
    ({ sellerId, sellerEmail }: IShopUser) => sellerEmail + sellerId.toString(),
    [],
  );
  const ListEmptyComponent = useCallback(
    () => <ListEmpty isPending={isPending} />,
    [isPending],
  );
  return (
    <AnimatedLegendList
      itemLayoutAnimation={LinearTransition.duration(280)}
      key={numColumns}
      numColumns={numColumns}
      columnWrapperStyle={numColumns > 1 ? { gap: 10 } : undefined}
      recycleItems
      maintainVisibleContentPosition={{ data: true }}
      contentContainerClassName="p-2"
      contentInsetAdjustmentBehavior="automatic"
      refreshing={refreshing}
      showsVerticalScrollIndicator={false}
      ItemSeparatorComponent={renderSeparator}
      ListFooterComponent={<ListFooter />}
      keyExtractor={keyExtractor}
      onRefresh={onRefresh}
      ListEmptyComponent={ListEmptyComponent}
      data={shopUsers}
      renderItem={renderItem}
    />
  );
};

export default ShopUserScreen;
