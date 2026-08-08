import { Stack } from "expo-router";

const AppLayout = () => {
  // const { t } = useLanguage();
  return (
    <Stack
      screenOptions={{
        headerBackButtonDisplayMode: "minimal",
      }}
    >
      <Stack.Screen
        name="privacy-policy"
        options={{
          title: "Privacy Policy",
          headerShown: false,
        }}
      />
      {/*<Stack.Screen
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
          title: "Terms & Conditions",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="shop-users"
        options={{
          title: "Shop Users",
        }}
      />
      <Stack.Screen
        name="delivery-times"
        options={{
          title: "Delivery Time Slots",
        }}
      />
      <Stack.Screen
        name="shipping-campaign/index"
        options={{
          title: "Shipping Campaigns",
        }}
      />
      <Stack.Screen
        name="shipping-fee/index"
        options={{
          title: "Shipping Fees",
          // headerRight: () => <ResetShippingFee />,
        }}
      />
      <Stack.Screen
        name="shop/index"
        options={{
          title: "My Shops",
        }}
      />
      <Stack.Screen
        name="image/[image]"
        options={{
          headerShown: false,
          presentation: "modal",
          animation: "slide_from_bottom",
        }}
      />
      <Stack.Screen
        name="shop/[shopId]/index"
        options={{
          headerTitle: "Shop Profile",
        }}
      />
      <Stack.Screen
        name="order/[orderId]/track"
        options={{
          headerTitle: "Tracking Details",
        }}
      />*/}
    </Stack>
  );
};

export default AppLayout;
