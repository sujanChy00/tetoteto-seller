import { ThemedText } from "@/components/ui/themed-text";
import { useSelectedShop } from "@/hooks/use-selected-shop";
import { useUser } from "@/hooks/use-user";
import BottomSheet, {
  BottomSheetScrollView,
} from "@expo/ui/community/bottom-sheet";
import { SymbolView } from "expo-symbols";
import { useCallback, useRef } from "react";
import { Pressable, View } from "react-native";
import { twMerge } from "tailwind-merge";
import { useCSSVariable } from "uniwind";

export const ShopSelector = () => {
  const sheetRef = useRef<BottomSheet>(null);
  const successColor = useCSSVariable("--color-success");
  const primaryColor = useCSSVariable("--color-primary");
  const { user } = useUser();
  const { selectedShop, setSelectedShop, shopLists } = useSelectedShop();
  const onOpen = useCallback(() => {
    sheetRef.current?.snapToIndex(0);
  }, []);
  const onClose = useCallback(() => {
    sheetRef.current?.close();
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
          <SymbolView
            tintColor={primaryColor as string}
            size={30}
            name={{
              android: "storefront",
              ios: "storefront",
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
      <BottomSheet
        ref={sheetRef}
        snapPoints={["50%", "75%", "90%"]}
        index={-1}
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
                    <SymbolView
                      name={{
                        ios: "checkmark",
                        android: "check",
                      }}
                      size={20}
                      tintColor={successColor as string}
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
      </BottomSheet>
    </View>
  );
};
