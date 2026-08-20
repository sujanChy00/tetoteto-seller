import { Link } from "expo-router";
import { View } from "react-native";
import { SecondaryButton } from "../ui/button";
import { StyledSymbolView } from "../ui/symbol-view";

export const HomeLinks = () => {
  return (
    <View className="flex-row items-center gap-6 justify-between">
      <Link asChild href={"/order"}>
        <SecondaryButton className="flex-1">
          <StyledSymbolView
            tintColorClassName={"accent-primary"}
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
          <StyledSymbolView
            tintColorClassName={"accent-primary"}
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
