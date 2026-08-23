import { PendingComponent } from "@/components/layout/pending-component";
import { useGetShopDetails } from "@/queries/shop-query";
import { useLocalSearchParams } from "expo-router";
import { View } from "react-native";

export default function PlaygroundScreen() {
  const { shopId } = useLocalSearchParams<{ shopId: string }>();
  const { data: shopDetails, isPending } = useGetShopDetails(shopId);

  if (isPending) return <PendingComponent />;

  return <View></View>;
}
