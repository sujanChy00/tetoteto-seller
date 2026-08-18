import { OrderPackingProvider } from "@/context/order-packing-provider";
import { ITransactionById } from "@/types";
import { Collapsible, RNHostView } from "@expo/ui";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { View } from "react-native";
import { Host } from "../ui/host";
import { Separator } from "../ui/separator";
import { Surface } from "../ui/surface";
import { ItemsToPackSheet } from "./items-to-pack-sheet";
import { OrderPackingButtons } from "./order-packing-buttons";
import { OrderPackingControl } from "./order-packing-control";
import { OrderdItemCard } from "./ordered-item-card";

export const OrderedItems = ({ order }: { order: ITransactionById }) => {
  const params = useLocalSearchParams<{ orderId: string }>();
  const [open, setOpen] = useState(false);
  const sellerAcknowledged = order.orderProgress === "SELLER_ACKNOWLEDGED";

  return (
    <OrderPackingProvider
      orderId={Number(params.orderId)}
      orderedItems={order.items}
    >
      <Surface className="p-0 overflow-hidden">
        <Host matchContents={{ vertical: true }}>
          <Collapsible
            label={`Ordered Items (${order.items.length})`}
            isOpen={open}
            onOpenChange={setOpen}
            labelStyle={{
              fontWeight: "600",
            }}
          >
            <RNHostView matchContents>
              <View className="gap-3 px-3">
                <ItemsToPackSheet />
                {sellerAcknowledged && <OrderPackingControl />}
                <Separator />
                <View className="gap-3 overflow-hidden">
                  {order.items.map((item) => (
                    <OrderdItemCard key={item.id} item={item} />
                  ))}
                </View>
                <OrderPackingButtons />
              </View>
            </RNHostView>
          </Collapsible>
        </Host>
      </Surface>
      {/*<Accordion variant="surface" selectionMode={"single"} collapsable>
        <Accordion.Item value={"orderedItems"}>
          <Accordion.Trigger>
            <ThemedText className="font-semibold">
              Ordered Items ({order.items.length})
            </ThemedText>
            <Accordion.Indicator />
          </Accordion.Trigger>
          <Accordion.Content className="gap-3">
            <ItemsToPackSheet />
            <OrderPackingControl orderStatus={order.orderProgress} />
            <Separator />
            <View className="gap-3 overflow-hidden">
              {order.items.map((item) => (
                <OrderdItemCard key={item.id} item={item} />
              ))}
            </View>
            <OrderPackingButtons />
          </Accordion.Content>
        </Accordion.Item>
      </Accordion>*/}
    </OrderPackingProvider>
  );
};
