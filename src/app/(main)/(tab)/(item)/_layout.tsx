import { MaterialTopTabs } from "@/components/layout/top-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useCSSVariable } from "uniwind";

const ItemsTabLayout = () => {
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
        name="item"
        options={{
          title: "Items",
        }}
      />
      <MaterialTopTabs.Screen
        name="stock-item"
        options={{
          title: "In Stock",
        }}
      />
      <MaterialTopTabs.Screen
        name="low-stock-item"
        options={{
          title: "Low Stock",
        }}
      />
      <MaterialTopTabs.Screen
        name="expired-item"
        options={{
          title: "Expired",
        }}
      />
    </MaterialTopTabs>
  );
};

export default ItemsTabLayout;
