import { PendingComponent } from "@/components/layout/pending-component";
import { ShopInfo } from "@/components/shop/shop-info";
import { ShopPrefectures } from "@/components/shop/shop-prefectures";
import { ShopPromotionalMessage } from "@/components/shop/shop-promotional-message";
import { ShopTitle } from "@/components/shop/shop-title";
import { PrimaryButton } from "@/components/ui/button";
import { FalllBackMesage } from "@/components/ui/fallback-message";
import { StyledImage } from "@/components/ui/image";
import { ParallaxScrollView } from "@/components/ui/parallax-scroll-view";
import { StyledSymbolView } from "@/components/ui/symbol-view";
import { useGetShopDetails } from "@/queries/shop-query";
import { Icon } from "@expo/ui";
import { Link, useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { RefreshControl, View } from "react-native";

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
    <ParallaxScrollView
      headerHeight={224}
      headerImage={
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
      }
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
      <View className="p-2 gap-6 pt-6">
        <ShopTitle data={data} />
        <ShopInfo shop={data} />
        <ShopPromotionalMessage promotionalMessage={data.shopIntroduction} />
        <ShopPrefectures prefectures={data.supportedPrefectures} />
      </View>
      <View className="px-2 pt-4">
        <PrimaryButton
          onPress={() => {
            router.push({
              pathname: "/shop/[shopId]/edit",
              params: {
                shopId,
              },
            });
          }}
        >
          <StyledSymbolView
            tintColorClassName={"accent-primary-foreground"}
            name={{
              android: "edit",
              ios: "pencil",
            }}
            size={18}
          />
          <PrimaryButton.Label>Edit Shop</PrimaryButton.Label>
        </PrimaryButton>
        <PrimaryButton
          onPress={() => {
            router.push({
              pathname: "/shop/[shopId]/legal-info",
              params: {
                shopId,
              },
            });
          }}
        >
          <StyledSymbolView
            tintColorClassName={"accent-primary-foreground"}
            name={{
              android: "edit",
              ios: "pencil",
            }}
            size={18}
          />
          <PrimaryButton.Label>Legal Info</PrimaryButton.Label>
        </PrimaryButton>
      </View>
      <View className="h-5" />
    </ParallaxScrollView>
  );
};

export default ShopDetailsScreen;
