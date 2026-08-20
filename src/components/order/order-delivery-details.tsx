import { ITransactionById } from "@/types";
import {
  transactionTypeColor,
  transactionTypeIcon,
} from "@/utils/order-status";
import { View } from "react-native";
import { Card } from "../ui/card";
import { Chip } from "../ui/chip";
import { ThemedText } from "../ui/themed-text";

export const OrderDeliveryDetails = ({
  order,
}: {
  order: ITransactionById;
}) => {
  return (
    <Card className="gap-6">
      <View className="flex-row items-start justify-between gap-3">
        <View className="gap-0.5">
          <ThemedText className="uppercase text-muted text-xs font-medium">
            ORDER ID
          </ThemedText>
          <ThemedText className="font-semibold">
            {order.transactionId}
          </ThemedText>
        </View>
        <View className="gap-0.5">
          <ThemedText className="uppercase text-muted text-xs font-medium">
            Order Type
          </ThemedText>
          <Chip
            size="sm"
            variant="secondary"
            color={transactionTypeColor[order.transactionType]}
            className="self-end rounded-lg"
          >
            {transactionTypeIcon[order.transactionType]}
            <Chip.Label className="uppercase">
              {order.transactionType}
            </Chip.Label>
          </Chip>
        </View>
      </View>
      <View className="flex-row items-start justify-between gap-3">
        {!!order?.expectedDeliveryDate ? (
          <View className="gap-0.5">
            <ThemedText className="uppercase text-muted text-xs font-medium">
              Expected Delivery Time
            </ThemedText>
            <ThemedText className="font-semibold">
              {order.expectedDeliveryDate}
            </ThemedText>
          </View>
        ) : (
          <View className="gap-0.5">
            <ThemedText className="uppercase text-muted text-xs font-medium">
              Shipping Time
            </ThemedText>
            <ThemedText className="font-semibold">
              {order.deliveryTime}
            </ThemedText>
          </View>
        )}
        <View className="gap-0.5">
          <ThemedText className="uppercase text-muted text-xs font-medium">
            Payment Method
          </ThemedText>
          <ThemedText className="font-semibold text-right">
            {order.paymentMethod}
          </ThemedText>
        </View>
      </View>
    </Card>
  );
};
