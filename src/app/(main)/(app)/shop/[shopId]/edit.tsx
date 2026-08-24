import { PendingComponent } from "@/components/layout/pending-component";
import { FalllBackMesage } from "@/components/ui/fallback-message";
import { ShopForm } from "@/form/shop/shop-form";
import { useLanguage } from "@/hooks/use-language";
import { useGetShopDetails } from "@/queries/shop-query";
import { Stack, useLocalSearchParams } from "expo-router";

const ShopEditScreen = () => {
  const { shopId } = useLocalSearchParams<{ shopId: string }>();
  const { data, isPending, error } = useGetShopDetails(shopId);
  const { t } = useLanguage();

  if (isPending)
    return (
      <>
        <PendingComponent />
        <Stack.Screen
          options={{
            title: t("Loading"),
            headerBackTitle: "back",
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
        <FalllBackMesage
          message={error?.message ?? "Failed to load shop details"}
        />
      </>
    );
  return (
    <>
      <Stack.Screen
        options={{
          title: data.shopName,
        }}
      />
      <ShopForm data={data} />
    </>
  );
};

export default ShopEditScreen;
