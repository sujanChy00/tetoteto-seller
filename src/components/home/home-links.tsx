import { Link } from "expo-router";
import { SymbolView } from "expo-symbols";
import { View } from "react-native";
import { useCSSVariable } from "uniwind";
import { SecondaryButton } from "../ui/button";

export const HomeLinks = () => {
  const primaryColor = useCSSVariable("--color-primary") as string;
  return (
    <View className="flex-row items-center gap-6 justify-between">
      <Link asChild href={"/order"}>
        <SecondaryButton className="flex-1">
          <SymbolView
            tintColor={primaryColor}
            size={20}
            name={{
              android: "shopping_cart",
              ios: "cart.fill",
            }}
          />
          <SecondaryButton.Label>Orders</SecondaryButton.Label>
        </SecondaryButton>
      </Link>
      <Link asChild href={"/shipments"}>
        <SecondaryButton className="flex-1">
          <SymbolView
            tintColor={primaryColor}
            size={20}
            name={{
              ios: "shippingbox.fill",
              android: "local_shipping",
            }}
          />
          <SecondaryButton.Label>Shipments</SecondaryButton.Label>
        </SecondaryButton>
      </Link>
    </View>
  );
};
