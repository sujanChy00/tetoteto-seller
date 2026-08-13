import { IshopDetails } from "@/types";
import { SymbolView } from "expo-symbols";
import { Linking, Pressable, View } from "react-native";
import { useCSSVariable } from "uniwind";
import { Host } from "../ui/host";
import { Separator } from "../ui/separator";
import { Surface } from "../ui/surface";
import { ThemedText } from "../ui/themed-text";

export const ShopInfo = ({ shop }: { shop: IshopDetails }) => {
  const primaryColor = useCSSVariable("--primary-color") as string;

  return (
    <Surface className="rounded-2xl p-0 border border-separator">
      <View className="flex-row items-center gap-x-2 p-3.5">
        <SymbolView
          name={{
            android: "info",
            ios: "info.circle",
          }}
          tintColor={primaryColor}
          size={20}
        />
        <ThemedText className="font-semibold">Shop Info</ThemedText>
      </View>
      <Host matchContents={{ vertical: true }}>
        <Separator />
      </Host>
      <View className="flex-row items-center gap-6 p-3.5 justify-between">
        <ThemedText className="text-muted text-sm">Shop Name</ThemedText>
        <ThemedText
          className="font-semibold flex-1 text-right"
          numberOfLines={1}
        >
          {shop.shopName}
        </ThemedText>
      </View>
      <Host matchContents={{ vertical: true }}>
        <Separator />
      </Host>
      <View className="flex-row items-center gap-6 p-3.5 justify-between">
        <ThemedText className="text-muted text-sm">Phone Number</ThemedText>
        <ThemedText
          className="font-semibold flex-1 text-right"
          numberOfLines={1}
        >
          {shop.shopPhoneNumber}
        </ThemedText>
      </View>
      {!!shop?.shopRegistrationNumber && (
        <>
          <Host matchContents={{ vertical: true }}>
            <Separator />
          </Host>
          <View className="flex-row items-center gap-6 p-3.5 justify-between">
            <ThemedText className="text-muted text-sm">
              Registration Number
            </ThemedText>
            <ThemedText
              className="font-semibold flex-1 text-right"
              numberOfLines={1}
            >
              {shop.shopRegistrationNumber}
            </ThemedText>
          </View>
        </>
      )}
      <Host matchContents={{ vertical: true }}>
        <Separator />
      </Host>
      <View className="flex-row items-center gap-6 p-3.5 justify-between">
        <ThemedText className="text-muted text-sm">Prefecture</ThemedText>
        <ThemedText
          className="font-semibold flex-1 text-right"
          numberOfLines={1}
        >
          {shop.prefecture}
        </ThemedText>
      </View>
      <Host matchContents={{ vertical: true }}>
        <Separator />
      </Host>
      <View className="flex-row items-center gap-6 p-3.5 justify-between">
        <ThemedText className="text-muted text-sm">Address</ThemedText>
        <ThemedText
          className="font-semibold flex-1 text-right"
          numberOfLines={1}
        >
          {shop.shopAddress}
        </ThemedText>
      </View>
      <Host matchContents={{ vertical: true }}>
        <Separator />
      </Host>
      <View className="flex-row items-center gap-6 p-3.5 justify-between">
        <ThemedText className="text-muted text-sm">
          Low Stock Threshold
        </ThemedText>
        <ThemedText
          className="font-semibold flex-1 text-right"
          numberOfLines={1}
        >
          {shop.lowStockThreshold}
        </ThemedText>
      </View>
      {!!shop.expiryThreshold && (
        <>
          <Host matchContents={{ vertical: true }}>
            <Separator />
          </Host>
          <View className="flex-row items-center gap-6 p-3.5 justify-between">
            <ThemedText className="text-muted text-sm">
              Expiry Threshold
            </ThemedText>
            <ThemedText
              className="font-semibold flex-1 text-right"
              numberOfLines={1}
            >
              {shop.expiryThreshold}
            </ThemedText>
          </View>
        </>
      )}
      <Host matchContents={{ vertical: true }}>
        <Separator />
      </Host>
      <View className="flex-row items-center gap-6 p-3.5 justify-between">
        <ThemedText className="text-muted text-sm">
          Min. Order Amount
        </ThemedText>
        <ThemedText
          className="font-semibold flex-1 text-right"
          numberOfLines={1}
        >
          ¥{shop.orderAmount}
        </ThemedText>
      </View>
      <Host matchContents={{ vertical: true }}>
        <Separator />
      </Host>
      <View className="flex-row items-center gap-6 p-3.5 justify-between">
        <ThemedText className="text-muted text-sm">Postal Code</ThemedText>
        <ThemedText
          className="font-semibold flex-1 text-right"
          numberOfLines={1}
        >
          {shop.shopPostalCode}
        </ThemedText>
      </View>
      {!!shop.shopFacebookUrl && (
        <>
          <Host matchContents={{ vertical: true }}>
            <Separator />
          </Host>
          <View className="flex-row items-center gap-6 p-3.5 justify-between">
            <ThemedText className="text-muted text-sm">
              Facebook Link
            </ThemedText>
            <Pressable
              className="flex-row items-center gap-1"
              onPress={() => Linking.openURL(shop.shopFacebookUrl)}
            >
              <ThemedText className="text-sm text-primary">View</ThemedText>
              <SymbolView
                name={{
                  android: "open_in_new",
                  ios: "arrow.up.right.square",
                }}
                size={16}
                tintColor={primaryColor}
              />
            </Pressable>
          </View>
        </>
      )}
      {!!shop.shopTiktokUrl && (
        <>
          <Host matchContents={{ vertical: true }}>
            <Separator />
          </Host>
          <View className="flex-row items-center gap-6 p-3.5 justify-between">
            <ThemedText className="text-muted text-sm">Tiktok Link</ThemedText>
            <Pressable
              className="flex-row items-center gap-1"
              onPress={() => Linking.openURL(shop.shopTiktokUrl)}
            >
              <ThemedText className="text-sm text-primary">View</ThemedText>
              <SymbolView
                name={{
                  android: "open_in_new",
                  ios: "arrow.up.right.square",
                }}
                size={16}
                tintColor={primaryColor}
              />
            </Pressable>
          </View>
        </>
      )}
    </Surface>
  );
};
