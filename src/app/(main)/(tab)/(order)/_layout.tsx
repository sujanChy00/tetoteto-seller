import { TopTabs } from "expo-router/js-top-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useCSSVariable } from "uniwind";

const OrdersTabLayout = () => {
  const { top } = useSafeAreaInsets();
  const primaryColor = useCSSVariable("--color-primary");
  const foregroundColor = useCSSVariable("--color-foreground");

  return (
    <TopTabs
      screenOptions={{
        lazy: true,
        tabBarInactiveTintColor: foregroundColor,
        tabBarStyle: {
          paddingTop: top,
        },
        tabBarIndicatorStyle: {
          backgroundColor: primaryColor,
        },

        tabBarActiveTintColor: primaryColor,
      }}
    >
      <TopTabs.Screen
        name="order"
        options={{
          title: "Orders",
        }}
      />
      <TopTabs.Screen
        name="waiting-order"
        options={{
          title: "Waiting",
        }}
      />
      <TopTabs.Screen
        name="pending-order"
        options={{
          title: "Pending",
        }}
      />
      <TopTabs.Screen
        name="all-order"
        options={{
          title: "All",
        }}
      />
    </TopTabs>
  );
};

export default OrdersTabLayout;
