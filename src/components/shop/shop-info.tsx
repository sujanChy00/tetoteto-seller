import { IshopDetails } from "@/types";
import { Linking, Pressable, View } from "react-native";
import { Separator } from "../ui/separator";
import { Surface } from "../ui/surface";
import { StyledSymbolView } from "../ui/symbol-view";
import { ThemedText } from "../ui/themed-text";

export const ShopInfo = ({ shop }: { shop: IshopDetails }) => {
  return (
    <Surface className="rounded-2xl p-0 border border-separator">
      <View className="flex-row items-center gap-x-2 p-3.5">
        <StyledSymbolView
          name={{
            android: "info",
            ios: "info.circle",
          }}
          tintColorClassName={"accent-primary"}
          size={20}
        />
        <ThemedText className="font-semibold">Shop Info</ThemedText>
      </View>
      <Separator />
      <View className="flex-row items-center gap-6 p-3.5 justify-between">
        <ThemedText className="text-muted text-sm">Shop Name</ThemedText>
        <ThemedText
          className="font-semibold flex-1 text-right"
          numberOfLines={1}
        >
          {shop.shopName}
        </ThemedText>
      </View>
      <Separator />
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
          <Separator />
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
      <Separator />
      <View className="flex-row items-center gap-6 p-3.5 justify-between">
        <ThemedText className="text-muted text-sm">Prefecture</ThemedText>
        <ThemedText
          className="font-semibold flex-1 text-right"
          numberOfLines={1}
        >
          {shop.prefecture}
        </ThemedText>
      </View>
      <Separator />
      <View className="flex-row items-center gap-6 p-3.5 justify-between">
        <ThemedText className="text-muted text-sm">Address</ThemedText>
        <ThemedText
          className="font-semibold flex-1 text-right"
          numberOfLines={1}
        >
          {shop.shopAddress}
        </ThemedText>
      </View>
      <Separator />
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
          <Separator />
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
      <Separator />
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
      <Separator />
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
          <Separator />
          <View className="flex-row items-center gap-6 p-3.5 justify-between">
            <ThemedText className="text-muted text-sm">
              Facebook Link
            </ThemedText>
            <Pressable
              className="flex-row items-center gap-1"
              onPress={() => Linking.openURL(shop.shopFacebookUrl)}
            >
              <ThemedText className="text-sm text-primary">View</ThemedText>
              <StyledSymbolView
                name={{
                  android: "open_in_new",
                  ios: "arrow.up.right.square",
                }}
                size={16}
                tintColorClassName={"accent-primary"}
              />
            </Pressable>
          </View>
        </>
      )}
      {!!shop.shopTiktokUrl && (
        <>
          <Separator />
          <View className="flex-row items-center gap-6 p-3.5 justify-between">
            <ThemedText className="text-muted text-sm">Tiktok Link</ThemedText>
            <Pressable
              className="flex-row items-center gap-1"
              onPress={() => Linking.openURL(shop.shopTiktokUrl)}
            >
              <ThemedText className="text-sm text-primary">View</ThemedText>
              <StyledSymbolView
                name={{
                  android: "open_in_new",
                  ios: "arrow.up.right.square",
                }}
                size={16}
                tintColorClassName={"accent-primary"}
              />
            </Pressable>
          </View>
        </>
      )}
    </Surface>
  );
};
