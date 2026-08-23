import { OrderPackingProvider } from "@/context/order-packing-provider";
import { ITransactionById } from "@/types";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { View } from "react-native";
import { Accordion } from "../ui/accordion";
import { Separator } from "../ui/separator";
import { ThemedText } from "../ui/themed-text";
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
      <Accordion selectionMode="single" isCollapsible variant="surface">
        <Accordion.Item value="ordered-items">
          <Accordion.Trigger className="py-6">
            <ThemedText className="flex-1">
              Ordered Items ({order.items.length})
            </ThemedText>
            <Accordion.Indicator />
          </Accordion.Trigger>
          <Accordion.Content>
            <View className="gap-3">
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
          </Accordion.Content>
        </Accordion.Item>
      </Accordion>
    </OrderPackingProvider>
  );
};
