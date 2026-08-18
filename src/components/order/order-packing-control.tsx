import { useOrderPacking } from "@/context/order-packing-provider";
import { useHaptics } from "@/hooks/use-haptics";
import { Switch } from "@expo/ui";
import { View } from "react-native";
import { twMerge } from "tailwind-merge";
import { Host } from "../ui/host";
import { ThemedText } from "../ui/themed-text";

export const OrderPackingControl = () => {
  const haptics = useHaptics();
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
      <Host matchContents>
        <Switch
          value={startPacking}
          onValueChange={(state) => {
            if (state) {
              haptics("toggle-on");
            } else {
              haptics("toggle-off");
            }
            setStartPacking(state);
          }}
        />
      </Host>
      {/*<ControlField
        isSelected={startPacking}
        onSelectedChange={(state) => {
          if (isIOS) {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          }
          setStartPacking(state);
        }}
        className="flex-row items-center gap-1"
      >
        <ThemedText className="text-xs text-muted font-semibold">
          Packing Mode:{" "}
        </ThemedText>
        <ControlField.Indicator />
      </ControlField>*/}
    </View>
  );
};
