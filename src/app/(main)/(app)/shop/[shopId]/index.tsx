import { PendingComponent } from "@/components/layout/pending-component";
import { ShopInfo } from "@/components/shop/shop-info";
import { ShopPrefectures } from "@/components/shop/shop-prefectures";
import { ShopPromotionalMessage } from "@/components/shop/shop-promotional-message";
import { ShopTitle } from "@/components/shop/shop-title";
import { Button } from "@/components/ui/button";
import { FalllBackMesage } from "@/components/ui/fallback-message";
import { StyledImage } from "@/components/ui/image";
import { ParallaxScrollView } from "@/components/ui/parallax-scroll-view";
import { useGetShopDetails } from "@/queries/shop-query";
import { Icon } from "@expo/ui";
import { useLocalSearchParams, useRouter } from "expo-router";
import { SymbolView } from "expo-symbols";
import { useState } from "react";
import { RefreshControl, View } from "react-native";
import { useCSSVariable } from "uniwind";

const EDIT_ICON = Icon.select({
  ios: "pencil",
  android: import("@expo/material-symbols/edit.xml"),
});

const ShopDetailsScreen = () => {
  const router = useRouter();
  const primaryForegroundColor = useCSSVariable(
    "--color-primary-foreground",
  ) as string;
  const [refreshing, setRefreshing] = useState(false);
  const { shopId } = useLocalSearchParams<{ shopId: string }>();
  const { data, isPending, refetch } = useGetShopDetails(shopId);
  if (isPending) return <PendingComponent />;
  if (!data) return <FalllBackMesage />;
  return (
    <ParallaxScrollView
      headerHeight={224}
      headerImage={
        <StyledImage
          placeholderContentFit="cover"
          source={data.shopPhotoUrl}
          alt={data.shopName}
          className="w-full h-56"
        />
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
        <Button.Primary
          onPress={() => {
            router.push({
              pathname: "/shop/[shopId]/edit",
              params: {
                shopId,
              },
            });
          }}
        >
          <SymbolView
            tintColor={primaryForegroundColor}
            name={{
              android: "edit",
              ios: "pencil",
            }}
            size={18}
          />
          <Button.PrimaryLabel>Edit Shop</Button.PrimaryLabel>
        </Button.Primary>
      </View>
      <View className="h-5" />
    </ParallaxScrollView>
  );
};

export default ShopDetailsScreen;
