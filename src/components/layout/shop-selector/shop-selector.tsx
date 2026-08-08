import { ThemedText } from "@/components/ui/themed-text";
import { useSelectedShop } from "@/hooks/use-selected-shop";
import { useUser } from "@/hooks/use-user";
import { truncateString } from "@/utils/truncate-string";
import { BottomSheet, Host, Icon, RNHostView, ScrollView } from "@expo/ui";
import { SymbolView } from "expo-symbols";
import { useState } from "react";
import { Pressable, View } from "react-native";
import { useCSSVariable } from "uniwind";

const STOREFRONT = Icon.select({
  android: import("@expo/material-symbols/storefront.xml"),
  ios: "storefront",
});

export const ShopSelector = () => {
  const successColor = useCSSVariable("--color-success");
  const accentColor = useCSSVariable("--color-primary");
  const mutedColor = useCSSVariable("--color-muted");
  const [isPresented, setIsPresented] = useState(false);
  const { user } = useUser();
  const { selectedShop, setSelectedShop, shopLists } = useSelectedShop();
  return (
    <View>
      <Pressable
        onPress={() => {
          setIsPresented(true);
        }}
        className="p-3 border-b border-b-separator/60"
      >
        <View className="flex-row items-center gap-3">
          <ThemedText
            className="text-xl font-bold font-serif flex-1"
            numberOfLines={1}
          >
            {selectedShop?.shopName}
          </ThemedText>
          <Host style={{ width: 30, height: 30 }}>
            <Icon name={STOREFRONT} size={30} color={accentColor as string} />
          </Host>
        </View>
        <ThemedText>
          Welcome back,{" "}
          <ThemedText className="font-semibold text-primary">
            {user?.profileDetails.shopAssistantName}
          </ThemedText>
        </ThemedText>
      </Pressable>
      <Host style={{ flex: 1 }}>
        <BottomSheet
          snapPoints={["half", "full"]}
          isPresented={isPresented}
          onDismiss={() => setIsPresented(false)}
        >
          <ScrollView showsIndicators={false}>
            <RNHostView matchContents>
              <View style={{ flex: 1, paddingBottom: 20 }}>
                {shopLists.map((shop) => {
                  const isSelected = selectedShop?.shopId === shop.value;
                  return (
                    <Pressable
                      style={{
                        paddingVertical: 12,
                        flexDirection: "row",
                        gap: 3,
                        alignItems: "center",
                      }}
                      key={shop.value}
                      onPress={() => {
                        const currentShop = user?.shopDetails.find(
                          (s) => s.shopId == shop.value,
                        );
                        currentShop && setSelectedShop(currentShop);
                        setIsPresented(false);
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
                        style={{
                          fontSize: 16,
                          fontWeight: isSelected ? "500" : "400",
                          color: isSelected
                            ? (successColor as string)
                            : undefined,
                        }}
                      >
                        {truncateString(shop.label, 35)}
                      </ThemedText>
                    </Pressable>
                  );
                })}
              </View>
            </RNHostView>
          </ScrollView>
        </BottomSheet>
      </Host>
    </View>
  );
};
