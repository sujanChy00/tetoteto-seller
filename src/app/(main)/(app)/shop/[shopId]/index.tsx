import { PendingComponent } from "@/components/layout/pending-component";
import { ShopInfo } from "@/components/shop/shop-info";
import { ShopPrefectures } from "@/components/shop/shop-prefectures";
import { ShopPromotionalMessage } from "@/components/shop/shop-promotional-message";
import { ShopTitle } from "@/components/shop/shop-title";
import { Button } from "@/components/ui/button";
import { FalllBackMesage } from "@/components/ui/fallback-message";
import { Host } from "@/components/ui/host";
import { StyledImage } from "@/components/ui/image";
import { Row } from "@/components/ui/row";
import { useGetShopDetails } from "@/queries/shop-query";
import { Icon, Spacer, Text } from "@expo/ui";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { RefreshControl, ScrollView, View } from "react-native";

const EDIT_ICON = Icon.select({
  ios: "pencil",
  android: import("@expo/material-symbols/edit.xml"),
});

const ShopDetailsScreen = () => {
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);
  const { shopId } = useLocalSearchParams<{ shopId: string }>();
  const { data, isPending, refetch } = useGetShopDetails(shopId);
  if (isPending) return <PendingComponent />;
  if (!data) return <FalllBackMesage />;
  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={() => {
            setRefreshing(true);
            refetch().finally(() => setRefreshing(false));
          }}
        />
      }
      showsVerticalScrollIndicator={false}
      contentInsetAdjustmentBehavior="automatic"
      contentContainerClassName="pb-safe-offset-6"
    >
      <StyledImage
        source={data.shopPhotoUrl}
        alt={data.shopName}
        className="w-full h-56"
      />
      <View className="p-2 gap-6 pt-6">
        <ShopTitle data={data} />
        <ShopInfo shop={data} />
        <ShopPromotionalMessage promotionalMessage={data.shopIntroduction} />
        <ShopPrefectures prefectures={data.supportedPrefectures} />
      </View>
      <View className="px-2 pt-4">
        <Host matchContents={{ vertical: true }}>
          <Button
            height={45}
            onPress={() => {
              router.push({
                pathname: "/shop/[shopId]/edit",
                params: {
                  shopId,
                },
              });
            }}
          >
            <Row alignment="center">
              <Icon name={EDIT_ICON} size={18} />
              <Spacer size={4} />
              <Text>Edit Shop</Text>
            </Row>
          </Button>
        </Host>
      </View>
      <View className="h-5" />
    </ScrollView>
  );
};

export default ShopDetailsScreen;
