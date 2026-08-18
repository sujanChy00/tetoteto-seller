import { ITransactionById } from "@/types";
import { dateTimestampFormatter } from "@/utils/date";
import { orderStatusColor } from "@/utils/order-status";
import { View } from "react-native";
import { Chip } from "../ui/chip";
import { ThemedText } from "../ui/themed-text";

export const OrderDetailsTitle = ({ order }: { order: ITransactionById }) => {
  return (
    <View className="flex-row items-end justify-between gap-3">
      <View>
        <ThemedText className="text-muted uppercase font-medium text-xs">
          ORDER DATE
        </ThemedText>
        <ThemedText className="font-semibold text-sm">
          {dateTimestampFormatter(order.transactionDateTimestamp)}
        </ThemedText>
      </View>
      <Chip
        variant="soft"
        className="rounded-lg"
        color={orderStatusColor[order.orderProgress]}
      >
        <Chip.Label
          className={order.orderProgress === "SHIPPED" ? "text-success" : ""}
        >
          {order.orderProgress.replaceAll("_", " ")}
        </Chip.Label>
      </Chip>
    </View>
  );
};
