import { useOrderPacking } from "@/context/order-packing-provider";
import { SlideInDown, SlideOutDown } from "react-native-reanimated";
import { AnimatedView } from "../ui/animated-view";
import { DangerGhostButton, PrimaryButton } from "../ui/button";

export const OrderPackingButtons = () => {
  const {
    startPacking,
    packAllOrders,
    resetPackedOrders,
    totalPackedOrders,
    isTotalItemsPacked,
  } = useOrderPacking();

  if (!startPacking) return null;

  const isResetingDisabled = !totalPackedOrders || totalPackedOrders === 0;

  return (
    <AnimatedView
      entering={SlideInDown}
      exiting={SlideOutDown}
      className="flex-row items-center gap-3 pt-3"
    >
      <DangerGhostButton
        disabled={isResetingDisabled}
        onPress={resetPackedOrders}
        // size="sm"
        className="rounded-full flex-1 h-9"
      >
        <DangerGhostButton.Label>RESET</DangerGhostButton.Label>
      </DangerGhostButton>
      <PrimaryButton
        disabled={isTotalItemsPacked}
        onPress={packAllOrders}
        className="rounded-full flex-1 h-9"
      >
        <PrimaryButton.Label>PACK ALL</PrimaryButton.Label>
      </PrimaryButton>
    </AnimatedView>
  );
};
