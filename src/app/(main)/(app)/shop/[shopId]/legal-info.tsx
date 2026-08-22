import DOMComponent from "@/components/dom-example";
import { PendingComponent } from "@/components/layout/pending-component";
import { useGetShopDetails } from "@/queries/shop-query";
import { useLocalSearchParams } from "expo-router";

export default function PlaygroundScreen() {
  const { shopId } = useLocalSearchParams<{ shopId: string }>();
  const { data: shopDetails, isPending } = useGetShopDetails(shopId);

  if (isPending) return <PendingComponent />;

  return <DOMComponent name="Sujan Chauda" />;
}
