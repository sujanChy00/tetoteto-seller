import { useOrderPacking } from "@/context/order-packing-provider";
import {
  BottomSheetModal,
  BottomSheetView,
} from "@expo/ui/community/bottom-sheet";
import { useCallback, useMemo } from "react";
import { Pressable, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { twMerge } from "tailwind-merge";
import { OutlineButton, SecondaryButton } from "../ui/button";
import { ThemedText } from "../ui/themed-text";

export const ItemsToPackSheet = () => {
  const { bottomSheetRef, closeSheet, oneItem, selectedItem, setPackedOrders } =
    useOrderPacking();
  const insets = useSafeAreaInsets();

  const currentItem = selectedItem?.(
    String((oneItem?.id || "") + (oneItem?.weight || "")),
  );

  const itemQuantity = oneItem?.quantity || 0;

  const itemsLength = itemQuantity > 15 ? 15 : itemQuantity;

  const isQuantitySelected = useCallback(
    (index: number) => {
      if (index + 1 === itemsLength && itemQuantity > 15) {
        return currentItem?.quantity === itemQuantity;
      }

      if (currentItem && currentItem.quantity >= index + 1) return true;
      return false;
    },
    [currentItem, itemQuantity, itemsLength],
  );

  const itemsArray = useMemo(() => {
    return Array.from({ length: itemsLength }, (_, i) => i + 1);
  }, [itemsLength]);

  const onPackItems = useCallback(
    (quantity: number) => {
      setPackedOrders({
        items: {
          itemId: String((oneItem?.id || "") + (oneItem?.weight || "")),
          quantity,
        },
      });
    },
    [oneItem, setPackedOrders],
  );

  return (
    <BottomSheetModal ref={bottomSheetRef} enablePanDownToClose>
      <BottomSheetView>
        <View className="gap-16 px-3 pb-3">
          <View className="flex-row flex-wrap items-center justify-center gap-4">
            {itemsArray.map((_, i) => (
              <Pressable
                className={twMerge(
                  "rounded-lg h-9 px-8 flex-row items-center justify-center border",
                  !isQuantitySelected(i)
                    ? "bg-transparent border-border"
                    : "bg-success/10 border-success",
                )}
                key={i}
                onPress={() => {
                  if (itemQuantity > 15 && i + 1 === itemsLength) {
                    onPackItems(itemQuantity);
                    return;
                  }
                  onPackItems(i + 1);
                }}
              >
                <ThemedText
                  className={twMerge(
                    "text-center",
                    isQuantitySelected(i) ? "text-success" : "",
                  )}
                >
                  {itemQuantity > 15 && i + 1 === itemsLength
                    ? `${itemQuantity}`
                    : i + 1}
                </ThemedText>
              </Pressable>
            ))}
          </View>
          <View className="gap-4">
            <View className="flex-row items-center justify-between gap-2">
              <SecondaryButton
                onPress={() => {
                  if (currentItem) {
                    onPackItems(currentItem.quantity - 1);
                  }
                }}
                disabled={!currentItem || currentItem?.quantity === 0}
                className="flex-1 bg-background"
              >
                <SecondaryButton.Label>-1</SecondaryButton.Label>
              </SecondaryButton>
              <SecondaryButton
                onPress={() => {
                  if (currentItem) {
                    onPackItems(currentItem.quantity + 1);
                    return;
                  }
                  onPackItems(1);
                }}
                disabled={itemQuantity === currentItem?.quantity}
                className="flex-1 bg-background"
              >
                <SecondaryButton.Label>+1</SecondaryButton.Label>
              </SecondaryButton>
              <SecondaryButton
                onPress={() => {
                  if (currentItem) {
                    onPackItems(currentItem.quantity - 5);
                  }
                }}
                disabled={!currentItem || currentItem?.quantity < 5}
                className="flex-1 bg-background"
              >
                <SecondaryButton.Label>-5</SecondaryButton.Label>
              </SecondaryButton>
              <SecondaryButton
                onPress={() => {
                  if (currentItem) {
                    onPackItems(currentItem.quantity + 5);
                    return;
                  }
                  onPackItems(5);
                }}
                disabled={
                  itemQuantity < 5 ||
                  currentItem?.quantity === itemQuantity ||
                  (currentItem && itemQuantity - currentItem?.quantity < 5)
                }
                className="flex-1 bg-background"
              >
                <SecondaryButton.Label>+5</SecondaryButton.Label>
              </SecondaryButton>
            </View>
            <View className="flex-row items-center gap-3">
              <OutlineButton
                disabled={!currentItem || currentItem?.quantity === 0}
                className="flex-1"
                onPress={() => {
                  onPackItems(0);
                  closeSheet();
                }}
              >
                <SecondaryButton.Label className="text-danger">
                  Unpack All
                </SecondaryButton.Label>
              </OutlineButton>

              <OutlineButton
                disabled={currentItem?.quantity === itemQuantity}
                className="flex-1"
                onPress={() => {
                  onPackItems(itemQuantity);
                  closeSheet();
                }}
              >
                <SecondaryButton.Label className="text-success">
                  Pack All
                </SecondaryButton.Label>
              </OutlineButton>
            </View>
          </View>
        </View>
      </BottomSheetView>
    </BottomSheetModal>
  );
};
