import { PendingComponent } from "@/components/layout/pending-component";
import { ShopAddress } from "@/components/shop/shop-address";
import { ShopInfo } from "@/components/shop/shop-info";
import { ShopPrefectures } from "@/components/shop/shop-prefectures";
import { ShopPromotionalMessage } from "@/components/shop/shop-promotional-message";
import { FalllBackMesage } from "@/components/ui/fallback-message";
import { StyledImage } from "@/components/ui/image";
import { useGetShopDetails } from "@/queries/shop-query";
import EDIT_ICON from "@expo/material-symbols/edit.xml";
import { Link, Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { RefreshControl, ScrollView, View } from "react-native";

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
      <Stack.Title>{data.shopName}</Stack.Title>
      <Stack.Toolbar placement="right">
        <Stack.Toolbar.Button
          variant="prominent"
          onPress={() => {
            router.push({
              pathname: "/shop/[shopId]/edit",
              params: {
                shopId,
              },
            });
          }}
        >
          <Stack.Toolbar.Icon sf="plus" src={EDIT_ICON} />
        </Stack.Toolbar.Button>
      </Stack.Toolbar>
      <Link
        href={{
          pathname: "/image/[image]",
          params: {
            image: data.shopPhotoUrl,
          },
        }}
      >
        <StyledImage
          placeholderContentFit="cover"
          source={data.shopPhotoUrl}
          alt={data.shopName}
          className="w-full h-56"
        />
      </Link>
      <View className="p-2 gap-6 pt-6">
        <ShopInfo shop={data} />
        <ShopAddress address={data.shopAddress} />
        <ShopPromotionalMessage promotionalMessage={data.shopIntroduction} />
        <ShopPrefectures prefectures={data.supportedPrefectures} />
      </View>
      <View className="h-5" />
    </ScrollView>
  );
};

export default ShopDetailsScreen;
