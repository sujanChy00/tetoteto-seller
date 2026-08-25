import { PendingComponent } from "@/components/layout/pending-component";
import { ItemVariationForm } from "@/form/item-variation/item-variation-form";
import { useRefreshOnFocus } from "@/hooks/use-refetch-onfocus";
import { useGetItemDetail } from "@/queries/item-query";
import { Stack, useLocalSearchParams } from "expo-router";
import { View } from "react-native";

const EditItemVariationScreen = () => {
  const { itemId, variationName } = useLocalSearchParams<{
    itemId: string;
    variationName?: string;
  }>();
  const { data, isPending, refetch } = useGetItemDetail(itemId);

  useRefreshOnFocus(refetch);

  const variation = data?.itemDetails.variations.find(
    (variation) =>
      variation.name.replaceAll(" ", "") === variationName?.replaceAll(" ", ""),
  );

  if (isPending) {
    return (
      <>
        <PendingComponent />
        <Stack.Title>Loading...</Stack.Title>
      </>
    );
  }
  return (
    <View className="flex-1">
      <Stack.Title>Edit {variation?.name}</Stack.Title>
      <ItemVariationForm variation={variation} refetch={refetch} />
    </View>
  );
};

export default EditItemVariationScreen;
