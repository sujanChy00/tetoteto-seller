import { MaterialTopTabs } from "@/components/layout/top-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useCSSVariable } from "uniwind";

const OrdersTabLayout = () => {
  const { top } = useSafeAreaInsets();
  const primaryColor = useCSSVariable("--color-primary");
  const foregroundColor = useCSSVariable("--color-foreground");

  return (
    <MaterialTopTabs
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
      <MaterialTopTabs.Screen
        name="order"
        options={{
          title: "Orders",
        }}
      />
      <MaterialTopTabs.Screen
        name="waiting-order"
        options={{
          title: "Waiting",
        }}
      />
      <MaterialTopTabs.Screen
        name="pending-order"
        options={{
          title: "Pending",
        }}
      />
      <MaterialTopTabs.Screen
        name="all-order"
        options={{
          title: "All",
        }}
      />
    </MaterialTopTabs>
  );
};

export default OrdersTabLayout;
