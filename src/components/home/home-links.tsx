import { SymbolView } from "expo-symbols";
import { View } from "react-native";
import { useCSSVariable } from "uniwind";
import { Button } from "../ui/button";

export const HomeLinks = () => {
  const primaryColor = useCSSVariable("--color-primary") as string;
  return (
    <View className="flex-row items-center gap-6 justify-between">
      <Button.Secondary className="flex-1">
        <SymbolView
          tintColor={primaryColor}
          size={20}
          name={{
            android: "shopping_cart",
            ios: "cart.fill",
          }}
        />
        <Button.SecondaryLabel>Orders</Button.SecondaryLabel>
      </Button.Secondary>

      <Button.Secondary className="flex-1">
        <SymbolView
          tintColor={primaryColor}
          size={20}
          name={{
            ios: "shippingbox.fill",
            android: "local_shipping",
          }}
        />
        <Button.SecondaryLabel>Shipments</Button.SecondaryLabel>
      </Button.Secondary>
    </View>
  );
};
