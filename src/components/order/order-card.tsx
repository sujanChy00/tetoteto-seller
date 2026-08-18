import { ITransactionContent } from "@/types";
import { dateTimestampFormatter } from "@/utils/date";
import { orderStatusColor, transactionTypeColor } from "@/utils/order-status";
import { Link } from "expo-router";
import { JSX, memo } from "react";
import { Pressable, View } from "react-native";
import { TertiaryButton } from "../ui/button";
import { Card } from "../ui/card";
import { Chip } from "../ui/chip";
import { Separator } from "../ui/separator";
import { ThemedText } from "../ui/themed-text";

interface Props {
  order: ITransactionContent;
  transactionTypeIcon: Record<string, JSX.Element>;
}

export const OrderCard = memo(({ order, transactionTypeIcon }: Props) => {
  const transactionDate = dateTimestampFormatter(order.orderDateTimestamp);

  return (
    <Link
      href={{
        pathname: "/order/[orderId]",
        params: {
          orderId: order.orderId.toString(),
        },
      }}
      asChild
    >
      <Pressable>
        <Card className="gap-3">
          <Card.Header className="flex-row justify-between items-center gap-3">
            <View className="flex-1 gap-1">
              <Card.Title className="flex-1" numberOfLines={1}>
                {order.userName}
              </Card.Title>
              <Card.Description className="text-xs font-medium">
                #{order.orderId}
              </Card.Description>
              <Card.Description className="text-xs font-medium">
                {transactionDate}
              </Card.Description>
            </View>
            <Chip
              size="sm"
              variant="soft"
              color={orderStatusColor[order.orderProgress]}
            >
              <Chip.Label
                className={
                  order.orderProgress === "SHIPPED" ? "text-success" : ""
                }
              >
                {order.orderProgress.replaceAll("_", " ")}
              </Chip.Label>
            </Chip>
          </Card.Header>

          <Card.Body className="gap-3 pt-2">
            <View className="flex-row items-start justify-between gap-3">
              <View className="gap-0.5">
                <ThemedText className="text-[10px] text-muted font-medium uppercase">
                  Payment Method
                </ThemedText>
                <ThemedText className="font-semibold capitalize">
                  {order.paymentMethod.replaceAll("_", " ")}
                </ThemedText>
              </View>
              <View className="gap-0.5">
                <ThemedText className="text-[10px] text-muted font-medium uppercase">
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
              <View className="gap-0.5">
                <ThemedText className="text-[10px] text-muted font-medium uppercase">
                  Total Items
                </ThemedText>
                <ThemedText className="font-semibold capitalize">
                  {order.itemCount} items
                </ThemedText>
              </View>
              <View className="gap-0.5">
                <ThemedText className="text-[10px] text-muted font-medium uppercase">
                  Sub Total
                </ThemedText>
                <ThemedText className="font-semibold capitalize text-right">
                  ¥{order.itemsTotalPrice.toLocaleString()}
                </ThemedText>
              </View>
            </View>
          </Card.Body>
          <Separator />
          <Card.Footer>
            <View className="flex-row items-start justify-between gap-3">
              <View className="gap-0.5">
                <ThemedText className="text-[10px] text-muted font-medium uppercase">
                  Total Price
                </ThemedText>
                <ThemedText className="font-semibold capitalize text-success">
                  ¥{order.totalPrice.toLocaleString()}
                </ThemedText>
              </View>
              <Link
                asChild
                href={{
                  pathname: "/order/[orderId]",
                  params: {
                    orderId: order.orderId.toString(),
                  },
                }}
              >
                <TertiaryButton className="h-9 rounded-xl">
                  <TertiaryButton.Label className="text-xs">
                    View details
                  </TertiaryButton.Label>
                </TertiaryButton>
              </Link>
            </View>
          </Card.Footer>
        </Card>
      </Pressable>
    </Link>
  );
});
