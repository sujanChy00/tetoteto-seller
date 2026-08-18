import { ITransactionById } from "@/types";
import { View } from "react-native";
import { Card } from "../ui/card";
import { Separator } from "../ui/separator";
import { ThemedText } from "../ui/themed-text";

export const OrderPaymentInfo = ({ order }: { order: ITransactionById }) => {
  return (
    <Card className="gap-4">
      <Card.Header className="gap-1">
        <ThemedText className="text-right text-muted">
          Total Weight: {order.totalWeight}
        </ThemedText>
        <View className="self-end gap-0.5">
          {order.taxInfo.map((tax, index) => (
            <ThemedText key={index} className="text-muted text-right">
              Total For {tax.taxPercentage}% tax: ¥{tax.itemTotal}
            </ThemedText>
          ))}
        </View>
      </Card.Header>
      <Separator />
      <Card.Body className="gap-2">
        <View className="gap-2">
          {order.taxInfo.map((tax, index) => (
            <View
              key={index}
              className="flex-row items-center justify-between gap-3"
            >
              <ThemedText className="text-muted">
                Tax {tax.taxPercentage}% ({tax.itemCount} items)
              </ThemedText>
              <ThemedText className="font-semibold font-mono text-success">
                + ¥{tax.totalTax}
              </ThemedText>
            </View>
          ))}
        </View>
        <View className="flex-row items-center justify-between gap-3">
          <ThemedText className="text-muted">Sub Total </ThemedText>
          <ThemedText className="font-semibold font-mono">
            ¥{order.beforeTaxItemTotal}
          </ThemedText>
        </View>
        <View className="flex-row items-center justify-between gap-3">
          <ThemedText className="text-muted">Shipping Fee</ThemedText>
          <ThemedText className="font-semibold text-success">
            {order.originalShippingPrice > order.shippingPrice && (
              <ThemedText className="line-through font-mono font-normal text-muted">
                ¥100
              </ThemedText>
            )}
            + ¥{order.shippingPrice}
          </ThemedText>
        </View>
        {!!order.discountAmount && (
          <View className="flex-row items-center justify-between gap-3">
            <ThemedText className="text-muted">Discount </ThemedText>
            <ThemedText className="font-semibold font-mono text-danger">
              - ¥{order.discountAmount}
            </ThemedText>
          </View>
        )}
        {!!order.extraPrice && (
          <View className="flex-row items-center justify-between gap-3">
            <ThemedText className="text-muted">Extra Fee </ThemedText>
            <ThemedText className="font-semibold font-mono text-success">
              + ¥{order.extraPrice}
            </ThemedText>
          </View>
        )}
        {!!order.redeemedPoints && (
          <View className="flex-row items-center justify-between gap-3">
            <ThemedText className="text-danger font-semibold">
              Points Redeemed{" "}
            </ThemedText>
            <ThemedText className="font-semibold font-mono text-danger">
              - ¥{order.redeemedPoints}
            </ThemedText>
          </View>
        )}
      </Card.Body>
      <Separator />
      <Card.Footer className="flex-row items-center justify-between gap-3">
        <ThemedText className="font-semibold text-base">Total</ThemedText>
        <ThemedText className="text-success font-bold font-mono text-lg">
          ¥{order.totalPrice}
        </ThemedText>
      </Card.Footer>
    </Card>
  );
};
