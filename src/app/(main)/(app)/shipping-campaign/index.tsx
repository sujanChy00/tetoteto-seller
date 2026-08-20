import { ShippingCampaignCard } from "@/components/shipping-campaign/shipping-campaign-card";
import { PrimaryButton } from "@/components/ui/button";
import { FabButton } from "@/components/ui/fab-button";
import { ListEmpty } from "@/components/ui/list/list-empty";
import { ListFooter } from "@/components/ui/list/list-footer";
import { ListSeparator } from "@/components/ui/list/list-separator";
import { StyledSymbolView } from "@/components/ui/symbol-view";
import { isAndroid } from "@/constants/platform";
import { useResponsiveListColumns } from "@/hooks/use-responsive-list-columns";
import { useGetAllShippingCampaigns } from "@/queries/campaign-query";
import { IShipppingCampaign } from "@/types";
import { LegendList } from "@legendapp/list/react-native";
import { useRouter } from "expo-router";
import { useCallback, useMemo, useState } from "react";
import { View } from "react-native";

const renderSeparator = () => <ListSeparator />;

const ShippingCampaignScreen = () => {
  const router = useRouter();
  const { numColumns } = useResponsiveListColumns();
  const [refreshing, setRefreshing] = useState(false);
  const { data, isPending, refetch } = useGetAllShippingCampaigns();
  () => <ListSeparator />;
  const shippingCampaigns = useMemo(() => data || [], [data]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetch().finally(() => setRefreshing(false));
  }, [refetch]);

  const renderItem = useCallback(
    ({ item }: { item: IShipppingCampaign }) => (
      <ShippingCampaignCard campaign={item} />
    ),
    [],
  );

  const keyExtractor = useCallback(
    ({ shippingCampaignId }: IShipppingCampaign) =>
      shippingCampaignId.toString(),
    [],
  );
  const ListEmptyComponent = useCallback(
    () => <ListEmpty isPending={isPending} />,
    [isPending],
  );
  return (
    <View className="flex-1">
      <LegendList
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
        data={shippingCampaigns}
        estimatedItemSize={310}
        renderItem={renderItem}
        drawDistance={500}
      />

      {isAndroid ? (
        <FabButton>
          <PrimaryButton
            onPress={() => {
              router.push({
                pathname: "/shipping-campaign/add",
              });
            }}
            className={"size-16"}
          >
            <StyledSymbolView
              size={28}
              name={{
                ios: "plus",
                android: "add",
              }}
              tintColorClassName={"accent-primary-foreground"}
            />
          </PrimaryButton>
        </FabButton>
      ) : null}
    </View>
  );
};

export default ShippingCampaignScreen;
