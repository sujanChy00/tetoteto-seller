import { DeliverTimeSlotCard } from "@/components/delivery-time/delivery-time-card";
import { ListEmpty } from "@/components/ui/list/list-empty";
import { ListFooter } from "@/components/ui/list/list-footer";
import { ListSeparator } from "@/components/ui/list/list-separator";
import { useResponsiveListColumns } from "@/hooks/use-responsive-list-columns";
import {
  useGetAvailableDeliveryTimes,
  useGetShopAvailableDeliveryTimes,
} from "@/queries/delivery-slots-query";
import { IShopDeliveryTimes } from "@/types";
import { AnimatedLegendList } from "@legendapp/list/reanimated";
import { useCallback, useMemo, useState } from "react";
import { View } from "react-native";
import { LinearTransition } from "react-native-reanimated";

const renderSeparator = () => <ListSeparator />;

const DeliveryTimeScreen = () => {
  const { numColumns } = useResponsiveListColumns();
  const [refreshing, setRefreshing] = useState(false);
  const { data, isPending } = useGetAvailableDeliveryTimes();
  const {
    data: currentTimeSlot,
    isPending: isLoading,
    refetch,
  } = useGetShopAvailableDeliveryTimes();

  const timeSlots = useMemo(() => {
    if (data && data.length > 0) {
      return data.filter(
        (dt) => dt.shippingCompanyId != currentTimeSlot?.shippingCompanyId,
      );
    }
    return [];
  }, [data, currentTimeSlot]);

  const Loading = isPending || isLoading || refreshing;
  const isDefault = !Loading && currentTimeSlot;

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetch().finally(() => setRefreshing(false));
  }, [refetch]);

  const renderItem = useCallback(
    ({ item }: { item: IShopDeliveryTimes }) => (
      <DeliverTimeSlotCard timeSlots={item} />
    ),
    [],
  );
  const keyExtractor = useCallback(
    ({ shippingCompanyId, shippingCompanyName }: IShopDeliveryTimes) =>
      shippingCompanyName + shippingCompanyId?.toString(),
    [],
  );
  const ListEmptyComponent = useCallback(
    () => <ListEmpty isPending={isPending || isLoading} />,
    [isPending, isLoading],
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
      data={timeSlots}
      renderItem={renderItem}
      ListHeaderComponent={() => {
        if (isDefault)
          return (
            <View className="mb-6">
              <DeliverTimeSlotCard timeSlots={currentTimeSlot} default />
            </View>
          );
      }}
    />
  );
};

export default DeliveryTimeScreen;
