import { ShippingFeeForm } from "@/components/form/shipping-fee/shipping-fee-form";
import { PendingComponent } from "@/components/layout/pending-component";
import { FalllBackMesage } from "@/components/ui/fallback-message";
import { useLanguage } from "@/hooks/use-language";
import { useGetAllShippingFee } from "@/queries/shipping-fee-query";
import { Stack, useLocalSearchParams } from "expo-router";

const EditShippingFeeScreen = () => {
  const { data, isPending, error } = useGetAllShippingFee();
  const { t } = useLanguage();
  const { id } = useLocalSearchParams<{ id: string }>();
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
  const shippingFee = data.find(
    (shippingFee) => String(shippingFee.sellerShippingId) === id,
  );
  return (
    <>
      <Stack.Screen
        options={{
          title: t("edit"),
        }}
      />
      <ShippingFeeForm data={shippingFee} />
    </>
  );
};

export default EditShippingFeeScreen;
