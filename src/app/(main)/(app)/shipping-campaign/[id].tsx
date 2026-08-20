import { ShippingCampaignForm } from "@/components/form/shipping-campaign/shipping-campaign-form";
import { PendingComponent } from "@/components/layout/pending-component";
import { FalllBackMesage } from "@/components/ui/fallback-message";
import { useLanguage } from "@/hooks/use-language";
import { useRefreshOnFocus } from "@/hooks/use-refetch-onfocus";
import { useGetShippingCampaignById } from "@/queries/campaign-query";
import { Stack, useLocalSearchParams } from "expo-router";
import { View } from "react-native";

const EditShippingCampaignScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { t } = useLanguage();
  const { data, isPending, error, refetch } = useGetShippingCampaignById(id);

  useRefreshOnFocus(refetch);

  if (isPending)
    return (
      <>
        <Stack.Screen
          options={{
            title: t("Loading"),
          }}
        />
        <PendingComponent />
      </>
    );
  if (!data)
    return (
      <>
        <Stack.Screen
          options={{
            title: "!Oops",
          }}
        />
        <FalllBackMesage
          message={error.message ?? "Shipping campaign not found"}
        />
      </>
    );

  return (
    <View className="flex-1">
      <Stack.Screen
        options={{
          title: data.shippingCampaignName,
        }}
      />
      <ShippingCampaignForm campaign={data} refetch={refetch} />
    </View>
  );
};

export default EditShippingCampaignScreen;
