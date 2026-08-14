import { IosShippingCampaignHeaderButton } from "@/components/shipping-campaign/ios-shipping-campaign-header-button";
import { ResetShippingFee } from "@/components/shipping-fee/reset-shipping-fee";
import { isAndroid, isIOS } from "@/constants/platform";
import { useLanguage } from "@/hooks/use-language";
import { Stack } from "expo-router";

const AppLayout = () => {
  const { t } = useLanguage();
  return (
    <Stack
      screenOptions={{
        headerBackButtonDisplayMode: "minimal",
      }}
    >
      <Stack.Screen
        name="privacy-policy"
        options={{
          title: t("privacy_policy"),
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="shipments/index"
        options={{
          headerTitle: "This list is updated every 2 hours",
          headerTitleStyle: {
            fontSize: 16,
          },
        }}
      />
      <Stack.Screen
        name="terms-condition"
        options={{
          title: t("terms_condition"),
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="shop-users"
        options={{
          title: t("shop_users"),
        }}
      />
      <Stack.Screen
        name="delivery-times"
        options={{
          title: t("delivery_time_slots"),
        }}
      />
      <Stack.Screen
        name="shipping-campaign/index"
        options={{
          title: t("shipping_campaigns"),
          headerRight: () =>
            isIOS ? <IosShippingCampaignHeaderButton /> : null,
        }}
      />
      <Stack.Screen
        name="shipping-fee/index"
        options={{
          title: t("shipping_fees"),
          headerRight: () => <ResetShippingFee />,
        }}
      />
      <Stack.Screen
        name="shop/index"
        options={{
          title: "My Shops",
        }}
      />
      <Stack.Screen
        name="profile/update"
        options={{
          title: t("update_profile"),
        }}
      />
      <Stack.Screen
        name="profile/update-password"
        options={{
          title: "Update Password",
        }}
      />
      <Stack.Screen
        name="image/[image]"
        options={
          isAndroid
            ? {
                headerShown: false,
                presentation: "formSheet",
                gestureDirection: "vertical",
                animation: "slide_from_bottom",
                sheetAllowedDetents: [1],
                sheetInitialDetentIndex: 0,
                sheetExpandsWhenScrolledToEdge: true,
              }
            : { headerShown: false }
        }
      />

      <Stack.Screen
        name="shop/[shopId]/index"
        options={{
          headerShown: false,
        }}
      />
      {/*<Stack.Screen
        name="order/[orderId]/track"
        options={{
          headerTitle: "Tracking Details",
        }}
      />*/}
    </Stack>
  );
};

export default AppLayout;
