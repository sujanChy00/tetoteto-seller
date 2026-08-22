import { useLanguage } from "@/hooks/use-language";
import { UserOrders } from "@/types";
import {
  orderStatusColor,
  transactionTypeColor,
  transactionTypeIcon,
} from "@/utils/order-status";
import { Link } from "expo-router";
import { memo } from "react";
import { TouchableOpacity, View } from "react-native";
import { Card } from "../ui/card";
import { Chip } from "../ui/chip";
import { Separator } from "../ui/separator";
import { ThemedText } from "../ui/themed-text";

export const UserOrderCard = memo(({ order }: { order: UserOrders }) => {
  const { t } = useLanguage();
  return (
    <Link
      asChild
      href={{
        pathname: "/order/[orderId]",
        params: {
          orderId: order.id,
        },
      }}
    >
      <TouchableOpacity>
        <Card className="gap-3 px-4">
          <Card.Header className="flex-row justify-between items-center gap-3">
            <View className="flex-1 gap-1">
              <Card.Title className="flex-1">#{order.id}</Card.Title>

              <Card.Description className="text-xs font-medium">
                {order.orderDate}
              </Card.Description>
            </View>
            <Chip
              size="sm"
              variant="soft"
              color={orderStatusColor[order.progress]}
            >
              <Chip.Label
                className={order.progress === "SHIPPED" ? "text-success" : ""}
              >
                {order.progress.replaceAll("_", " ")}
              </Chip.Label>
            </Chip>
          </Card.Header>
          <Separator />
          <Card.Body className="gap-3 pt-2">
            <View className="flex-row items-start justify-between gap-3">
              <View className="gap-0.5">
                <ThemedText className="text-[10px] text-muted font-medium uppercase">
                  {t("payment_method")}
                </ThemedText>
                <ThemedText className="font-semibold capitalize">
                  {order.paymentMethod.replaceAll("_", " ")}
                </ThemedText>
              </View>
              <View className="gap-0.5">
                <ThemedText className="text-[10px] text-muted font-medium uppercase">
                  {t("transaction_type")}
                </ThemedText>
                <Chip
                  size="sm"
                  variant="secondary"
                  color={transactionTypeColor[order.type]}
                  className="self-end rounded-lg"
                >
                  {transactionTypeIcon[order.type]}
                  <Chip.Label className="uppercase">{order.type}</Chip.Label>
                </Chip>
              </View>
            </View>
            <View className="flex-row items-start justify-between gap-3">
              <View className="gap-0.5">
                <ThemedText className="text-[10px] text-muted font-medium uppercase">
                  {t("items_count")}
                </ThemedText>
                <ThemedText className="font-semibold capitalize">
                  {order.itemCount} items
                </ThemedText>
              </View>
              <View className="gap-0.5">
                <ThemedText className="text-[10px] text-muted font-medium uppercase text-right">
                  {t("total")}
                </ThemedText>
                <ThemedText className="font-semibold capitalize text-right text-success">
                  ¥{order.totalPrice.toLocaleString()}
                </ThemedText>
              </View>
            </View>
          </Card.Body>
        </Card>
      </TouchableOpacity>
    </Link>
  );
});
