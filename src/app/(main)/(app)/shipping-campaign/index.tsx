import { ShippingCampaignCard } from "@/components/shipping-campaign/shipping-campaign-card";
import { ListEmpty } from "@/components/ui/list/list-empty";
import { ListFooter } from "@/components/ui/list/list-footer";
import { ListSeparator } from "@/components/ui/list/list-separator";
import { useLanguage } from "@/hooks/use-language";
import { useResponsiveListColumns } from "@/hooks/use-responsive-list-columns";
import { useGetAllShippingCampaigns } from "@/queries/campaign-query";
import { IShipppingCampaign } from "@/types";
import PLUST_ICON from "@expo/material-symbols/add.xml";
import { LegendList } from "@legendapp/list/react-native";
import { Stack, useRouter } from "expo-router";
import { useCallback, useMemo, useState } from "react";
import { View } from "react-native";

const renderSeparator = () => <ListSeparator />;

const ShippingCampaignScreen = () => {
  const router = useRouter();
  const { t } = useLanguage();
  const { numColumns } = useResponsiveListColumns();
  const [refreshing, setRefreshing] = useState(false);
  const { data, isPending, refetch } = useGetAllShippingCampaigns();
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
      <Stack.Title>{t("shipping_campaigns")}</Stack.Title>
      <Stack.Toolbar placement="right">
        <Stack.Toolbar.Button
          variant="prominent"
          onPress={() => {
            router.push({
              pathname: "/shipping-campaign/add",
            });
          }}
        >
          <Stack.Toolbar.Icon sf="plus" src={PLUST_ICON} />
        </Stack.Toolbar.Button>
      </Stack.Toolbar>
      <LegendList
        // key={numColumns}
        // numColumns={numColumns}
        // columnWrapperStyle={numColumns > 1 ? { gap: 10 } : undefined}
        recycleItems
        maintainVisibleContentPosition
        contentContainerClassName="p-2"
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
        experimental_adaptiveRender={{
          enterVelocity: 6,
          exitVelocity: 3,
          exitDelay: 250,
        }}
      />
    </View>
  );
};

export default ShippingCampaignScreen;
