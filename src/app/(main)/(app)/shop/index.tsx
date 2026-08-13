import { ShopCard } from "@/components/shop/shop-card";
import { ListEmpty } from "@/components/ui/list/list-empty";
import { ListFooter } from "@/components/ui/list/list-footer";
import { ListSeparator } from "@/components/ui/list/list-separator";
import { useResponsiveListColumns } from "@/hooks/use-responsive-list-columns";
import { useUser } from "@/hooks/use-user";
import { ISellerShopDetail } from "@/types";
import { LegendList } from "@legendapp/list/react-native";
import { useCallback, useMemo } from "react";

const renderSeparator = () => <ListSeparator />;

const ShopScreen = () => {
  const { numColumns } = useResponsiveListColumns();
  const { user } = useUser();

  const data = useMemo(() => user?.shopDetails || [], [user]);

  const renderItem = useCallback(
    ({ item }: { item: ISellerShopDetail }) => <ShopCard shop={item} />,
    [],
  );

  const keyExtractor = useCallback(
    ({ shopId }: ISellerShopDetail) => shopId.toString(),
    [],
  );
  const ListEmptyComponent = useCallback(
    () => <ListEmpty isPending={false} />,
    [],
  );

  return (
    <LegendList
      key={numColumns}
      numColumns={numColumns}
      columnWrapperStyle={numColumns > 1 ? { gap: 10 } : undefined}
      recycleItems
      maintainVisibleContentPosition={{ data: true }}
      contentContainerClassName="p-2"
      contentInsetAdjustmentBehavior="automatic"
      showsVerticalScrollIndicator={false}
      ItemSeparatorComponent={renderSeparator}
      ListFooterComponent={<ListFooter />}
      keyExtractor={keyExtractor}
      ListEmptyComponent={ListEmptyComponent}
      estimatedItemSize={311}
      drawDistance={500}
      data={data}
      renderItem={renderItem}
    />
  );
};

export default ShopScreen;
