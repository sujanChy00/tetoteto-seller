import { isAndroid } from "@/constants/platform";
import { useLanguage } from "@/hooks/use-language";
import { Stack, useRouter } from "expo-router";

const AppLayout = () => {
  const { t } = useLanguage();
  const router = useRouter();
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
        name="shipping-campaign/add"
        options={{
          title: "Add Shipping Campaign",
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
                presentation: "fullScreenModal",
                animation: "slide_from_bottom",
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
      <Stack.Screen
        name="user-orders/[userId]"
        options={{
          headerTitle: "User Orders",
        }}
      />
      <Stack.Screen
        name="order/[orderId]/update-address"
        options={{
          headerTitle: "Update Address",
        }}
      />
      <Stack.Screen
        name="item/[itemId]/edit"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="item/[itemId]/variation/add"
        options={{
          headerTitle: "Add Variation",
        }}
      />
      <Stack.Screen
        name="item/[itemId]/copy"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="item/add"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="item/[itemId]/manage-image"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="order/[orderId]/track"
        options={{
          headerTitle: "Tracking Details",
        }}
      />
    </Stack>
  );
};

export default AppLayout;
