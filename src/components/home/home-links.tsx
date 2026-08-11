import { Host } from "@/components/ui/host";
import { Icon, Spacer, Text } from "@expo/ui";
import { Button } from "../ui/button";
import { Row } from "../ui/row";

const ORDER_ICON = Icon.select({
  ios: "cart.fill",
  android: import("@expo/material-symbols/shopping_cart.xml"),
});

const SHIPMENT_ICON = Icon.select({
  ios: "shippingbox.fill",
  android: import("@expo/material-symbols/local_shipping.xml"),
});

export const HomeLinks = () => {
  return (
    <Host matchContents={{ vertical: true }} style={{ width: "100%" }}>
      <Row alignment="center">
        <Button variant="elevated">
          <Row alignment="center">
            <Icon size={20} name={ORDER_ICON} />
            <Text>Orders</Text>
          </Row>
        </Button>

        <Spacer size={24} />

        <Button variant="elevated">
          <Row alignment="center">
            <Icon size={20} name={SHIPMENT_ICON} />
            <Spacer size={4} />
            <Text>Shipments</Text>
          </Row>
        </Button>
      </Row>
    </Host>
  );
};
