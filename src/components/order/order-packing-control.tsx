import { useOrderPacking } from "@/context/order-packing-provider";
import { View } from "react-native";
import { twMerge } from "tailwind-merge";
import { SwitchInput } from "../ui/switch-input";
import { ThemedText } from "../ui/themed-text";

export const OrderPackingControl = () => {
  const {
    setStartPacking,
    totalPackedOrders,
    totalOrderQuantity,
    startPacking,
    isTotalItemsPacked,
  } = useOrderPacking();

  return (
    <View className="flex-row items-center justify-between">
      <ThemedText
        className={twMerge(
          "font-semibold text-xs",
          !isTotalItemsPacked ? "text-muted" : "text-danger",
        )}
      >
        Total Packed: {totalPackedOrders || "0"}/{totalOrderQuantity}
      </ThemedText>
      <SwitchInput value={startPacking} onValueChange={setStartPacking} />
    </View>
  );
};
