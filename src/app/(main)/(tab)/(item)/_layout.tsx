import { TopTabs } from "expo-router/js-top-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useCSSVariable } from "uniwind";

const ItemsTabLayout = () => {
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
        name="item"
        options={{
          title: "Items",
        }}
      />
      <TopTabs.Screen
        name="stock-item"
        options={{
          title: "In Stock",
        }}
      />
      <TopTabs.Screen
        name="low-stock-item"
        options={{
          title: "Low Stock",
        }}
      />
      <TopTabs.Screen
        name="expired-item"
        options={{
          title: "Expired",
        }}
      />
    </TopTabs>
  );
};

export default ItemsTabLayout;
