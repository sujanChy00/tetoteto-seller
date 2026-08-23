import { OrderPackingProvider } from "@/context/order-packing-provider";
import { ITransactionById } from "@/types";
import { Collapsible, RNHostView } from "@expo/ui";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { View } from "react-native";
import { useCSSVariable } from "uniwind";
import { Host } from "../ui/host";
import { OrderdItemCard } from "./ordered-item-card";

export const OrderedItems = ({ order }: { order: ITransactionById }) => {
  const [surfaceColor] = useCSSVariable(["--color-surface"]);
  const params = useLocalSearchParams<{ orderId: string }>();
  const [open, setOpen] = useState(false);
  const sellerAcknowledged = order.orderProgress === "SELLER_ACKNOWLEDGED";

  return (
    <OrderPackingProvider
      orderId={Number(params.orderId)}
      orderedItems={order.items}
    >
      <Host
        matchContents={{ vertical: true }}
        style={{
          backgroundColor: surfaceColor as string,
          borderRadius: 24,
        }}
      >
        <Collapsible
          label={`Ordered Items (${order.items.length})`}
          isOpen={open}
          onOpenChange={setOpen}
          labelStyle={{
            fontWeight: "600",
          }}
        >
          <RNHostView matchContents>
            <View className="gap-3 overflow-hidden">
              {order.items.map((item) => (
                <OrderdItemCard key={item.id} item={item} />
              ))}
            </View>
          </RNHostView>
        </Collapsible>
      </Host>
    </OrderPackingProvider>
  );
};
