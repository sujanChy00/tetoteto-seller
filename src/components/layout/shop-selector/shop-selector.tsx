import { StyledSymbolView } from "@/components/ui/symbol-view";
import { ThemedText } from "@/components/ui/themed-text";
import { useSelectedShop } from "@/hooks/use-selected-shop";
import { useUser } from "@/hooks/use-user";
import {
  BottomSheetModal,
  BottomSheetScrollView,
} from "@expo/ui/community/bottom-sheet";
import { useCallback, useRef } from "react";
import { Pressable, View } from "react-native";
import { twMerge } from "tailwind-merge";

export const ShopSelector = () => {
  const sheetRef = useRef<BottomSheetModal>(null);
  const { user } = useUser();
  const { selectedShop, setSelectedShop, shopLists } = useSelectedShop();
  const onOpen = useCallback(() => {
    sheetRef.current?.present();
  }, []);
  const onClose = useCallback(() => {
    sheetRef.current?.dismiss();
  }, []);
  return (
    <View>
      <Pressable
        onPress={() => onOpen()}
        className="p-3 border-b border-b-separator/60"
      >
        <View className="flex-row items-center gap-3">
          <ThemedText
            className="text-xl font-bold font-serif flex-1"
            numberOfLines={1}
          >
            {selectedShop?.shopName}
          </ThemedText>
          <StyledSymbolView
            tintColorClassName={"accent-foreground"}
            size={30}
            name={{
              android: "keyboard_arrow_down",
              ios: "chevron.down",
            }}
          />
        </View>
        <ThemedText>
          Welcome back,{" "}
          <ThemedText className="font-semibold text-primary">
            {user?.profileDetails.shopAssistantName}
          </ThemedText>
        </ThemedText>
      </Pressable>
      <BottomSheetModal
        ref={sheetRef}
        snapPoints={["50%", "75%", "90%"]}
        enablePanDownToClose
      >
        <BottomSheetScrollView
          showsVerticalScrollIndicator={false}
          contentContainerClassName="pb-safe-offset-12"
        >
          <View className="px-4">
            {shopLists.map((shop) => {
              const isSelected = selectedShop?.shopId === shop.value;
              return (
                <Pressable
                  className="py-4 flex-row items-center gap-1"
                  key={shop.value}
                  onPress={() => {
                    const currentShop = user?.shopDetails.find(
                      (s) => s.shopId == shop.value,
                    );
                    currentShop && setSelectedShop(currentShop);
                    onClose();
                  }}
                >
                  {isSelected && (
                    <StyledSymbolView
                      name={{
                        ios: "checkmark",
                        android: "check",
                      }}
                      size={20}
                      tintColorClassName={"accent-success"}
                    />
                  )}
                  <ThemedText
                    numberOfLines={2}
                    className={twMerge(
                      "text-base flex-1",
                      isSelected ? "font-medium text-success" : "font-normal",
                    )}
                  >
                    {shop.label}
                  </ThemedText>
                </Pressable>
              );
            })}
          </View>
        </BottomSheetScrollView>
      </BottomSheetModal>
    </View>
  );
};
