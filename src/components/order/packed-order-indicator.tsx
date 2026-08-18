import { useOrderPacking } from "@/context/order-packing-provider";
import { ITransactionByIdItems } from "@/types";
import {
  SlideInLeft,
  SlideOutLeft,
  ZoomIn,
  ZoomOut,
} from "react-native-reanimated";
import { AnimatedView } from "../ui/animated-view";
import { ThemedText } from "../ui/themed-text";
interface Props {
  item: ITransactionByIdItems;
}
export const PackedOrderIndicator = ({ item }: Props) => {
  const {
    isItemSelected,
    selectedItem: currentItem,
    selectedOrder,
    startPacking,
  } = useOrderPacking();

  const uniqueId = `${item.id}${item.weight}`;
  const packedData = currentItem?.(uniqueId);

  if (!startPacking && !selectedOrder) return null;

  const isFullyPacked = packedData?.quantity === item.quantity;
  const showCounter = item.quantity > 1 && !isFullyPacked;

  if (showCounter) {
    return (
      <AnimatedView entering={ZoomIn} exiting={ZoomOut}>
        <ThemedText className="text-sm font-medium text-muted">
          {packedData?.quantity || 0}/{item.quantity}
        </ThemedText>
      </AnimatedView>
    );
  }

  const selectedItem = isItemSelected?.(String(item.id + item.weight));

  return (
    <AnimatedView
      className={
        "size-5 rounded-full border dark:border-separator border-separator/60 items-center justify-center"
      }
      entering={SlideInLeft}
      exiting={SlideOutLeft}
    >
      {selectedItem && (
        <AnimatedView
          className={"size-3 rounded-full bg-success"}
          entering={ZoomIn.duration(200)}
          exiting={ZoomOut.duration(200)}
        />
      )}
    </AnimatedView>
  );
};
