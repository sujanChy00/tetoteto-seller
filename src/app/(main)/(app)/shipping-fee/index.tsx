import { ResetShippingFeeDialog } from "@/components/shipping-fee/reset-shipping-fee-dialog";
import { ShippingFeeCard } from "@/components/shipping-fee/shipping-fee-card";
import { DangerSoftButton } from "@/components/ui/button";
import { Host } from "@/components/ui/host";
import { IOSGlassButton } from "@/components/ui/ios-glass-button";
import { ListEmpty } from "@/components/ui/list/list-empty";
import { ListFooter } from "@/components/ui/list/list-footer";
import { ListSeparator } from "@/components/ui/list/list-separator";
import { isIOS } from "@/constants/platform";
import { useLanguage } from "@/hooks/use-language";
import { useResponsiveListColumns } from "@/hooks/use-responsive-list-columns";
import { useGetAllShippingFee } from "@/queries/shipping-fee-query";
import { IshippingFee } from "@/types";
import { LegendList } from "@legendapp/list/react-native";
import { Stack } from "expo-router";
import { useCallback, useMemo, useState } from "react";
import { View } from "react-native";

const renderSeparator = () => <ListSeparator />;

const ShippingFeeScreen = () => {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
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
      <ShippingFeeCard shippingFee={item} />
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
    <View className="flex-1">
      <ResetShippingFeeDialog
        isVisible={isVisible}
        setIsVisible={setIsVisible}
      />
      <Stack.Title>{isPending ? "Loading..." : t("shipping_fees")}</Stack.Title>
      <Stack.Toolbar placement="right">
        <Stack.Toolbar.View>
          {isIOS ? (
            <Host matchContents>
              <IOSGlassButton
                label="Reset"
                role="destructive"
                variant="glassProminent"
                size="small"
                onPress={() => setIsVisible(true)}
              />
            </Host>
          ) : (
            <DangerSoftButton
              className="h-8"
              onPress={() => setIsVisible(true)}
            >
              <DangerSoftButton.Label>{t("reset")} </DangerSoftButton.Label>
            </DangerSoftButton>
          )}
        </Stack.Toolbar.View>
      </Stack.Toolbar>
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
    </View>
  );
};

export default ShippingFeeScreen;
