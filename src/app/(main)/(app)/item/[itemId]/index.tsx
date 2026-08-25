import { ItemCoolSwitch } from "@/components/item/item-cool-switch";
import { ItemDetailsCard } from "@/components/item/item-details-card";
import { ItemDetailsTabs } from "@/components/item/item-details-tabs";
import { ItemDiscountedShippingSwitch } from "@/components/item/item-discounted-shipping-switch";
import { ItemOptions } from "@/components/item/item-options";
import { ItemStatusSwitch } from "@/components/item/item-status-switch";
import { PendingComponent } from "@/components/layout/pending-component";
import { Carousel } from "@/components/ui/carousel";
import { FalllBackMesage } from "@/components/ui/fallback-message";
import { Separator } from "@/components/ui/separator";
import { Surface } from "@/components/ui/surface";
import { useGetItemDetail } from "@/queries/item-query";
import { Stack, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { ScrollView, View } from "react-native";
import { RefreshControl } from "react-native-gesture-handler";

const ItemDetailScreen = () => {
  const [refreshing, setRefreshing] = useState(false);
  const { itemId } = useLocalSearchParams<{ itemId: string }>();
  const { data, isPending, refetch, error } = useGetItemDetail(itemId);

  if (isPending)
    return (
      <>
        <PendingComponent />
        <Stack.Screen
          options={{
            headerTitle: "Loading...",
          }}
        />
      </>
    );

  if (!data)
    return (
      <>
        <Stack.Screen
          options={{
            headerTitle: "!Oops",
          }}
        />
        <FalllBackMesage message={error.message || "Item not found"} />
      </>
    );
  return (
    <View className="flex-1">
      <Stack.Title>Product Details</Stack.Title>
      <Stack.Toolbar placement="right">
        <ItemOptions />
      </Stack.Toolbar>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior="automatic"
        keyboardShouldPersistTaps="handled"
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              setRefreshing(true);
              refetch().finally(() => setRefreshing(false));
            }}
          />
        }
      >
        <View className="gap-6">
          <Carousel images={data.itemImages.images ?? []} />
          <View className="gap-6 px-2">
            <ItemDetailsTabs data={data.itemDescription} />
            <Surface className="gap-3 border border-separator rounded-2xl">
              <ItemDetailsCard item={data?.itemDetails!} />
              <Separator />
              <ItemCoolSwitch data={data} />
              <Separator />
              <ItemDiscountedShippingSwitch data={data} />
              <Separator />
              <ItemStatusSwitch
                value={data?.itemDetails.itemDisabled ?? false}
                itemId={data?.itemDetails.itemId || ""}
              />
            </Surface>
          </View>
        </View>
        <View className="h-10" />
      </ScrollView>
    </View>
  );
};

export default ItemDetailScreen;
