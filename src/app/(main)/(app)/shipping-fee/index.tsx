import { ShippingFeeCard } from "@/components/shipping-fee/shipping-fee-card";
import { ListEmpty } from "@/components/ui/list/list-empty";
import { ListFooter } from "@/components/ui/list/list-footer";
import { ListSeparator } from "@/components/ui/list/list-separator";
import { useResponsiveListColumns } from "@/hooks/use-responsive-list-columns";
import { useGetAllShippingFee } from "@/queries/shipping-fee-query";
import { IshippingFee } from "@/types";
import { LegendList } from "@legendapp/list/react-native";
import { useCallback, useMemo, useState } from "react";
import { useCSSVariable } from "uniwind";

const renderSeparator = () => <ListSeparator />;

const ShippingFeeScreen = () => {
  const primaryColor = useCSSVariable("--color-primary") as string;
  const warningColor = useCSSVariable("--color-warning") as string;
  const successColor = useCSSVariable("--color-success") as string;
  const { numColumns } = useResponsiveListColumns();
  const [refreshing, setRefreshing] = useState(false);
  const { data, isPending, refetch } = useGetAllShippingFee();

  const shippingFees = useMemo(() => data || [], [data]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetch().finally(() => setRefreshing(false));
  }, [refetch]);

  const renderItem = useCallback(
    ({ item }: { item: IshippingFee }) => (
      <ShippingFeeCard
        shippingFee={item}
        primaryColor={primaryColor}
        warningColor={warningColor}
        successColor={successColor}
      />
    ),
    [],
  );

  const keyExtractor = useCallback(
    ({ sellerShippingId }: IshippingFee) => sellerShippingId.toString(),
    [],
  );
  const ListEmptyComponent = useCallback(
    () => <ListEmpty isPending={isPending} />,
    [isPending],
  );
  return (
    <LegendList
      key={numColumns}
      numColumns={numColumns}
      columnWrapperStyle={numColumns > 1 ? { gap: 10 } : undefined}
      recycleItems
      maintainVisibleContentPosition={{ data: true }}
      contentContainerClassName="p-2"
      estimatedItemSize={308}
      contentInsetAdjustmentBehavior="automatic"
      refreshing={refreshing}
      drawDistance={500}
      showsVerticalScrollIndicator={false}
      ItemSeparatorComponent={renderSeparator}
      ListFooterComponent={<ListFooter />}
      keyExtractor={keyExtractor}
      onRefresh={onRefresh}
      ListEmptyComponent={ListEmptyComponent}
      data={shippingFees}
      renderItem={renderItem}
    />
  );
};

export default ShippingFeeScreen;
