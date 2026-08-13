import { IshopDetails } from "@/types";
import { SymbolView } from "expo-symbols";
import { View } from "react-native";
import { useCSSVariable } from "uniwind";
import { Chip } from "../ui/chip";
import { ThemedText } from "../ui/themed-text";

export const ShopTitle = ({ data }: { data: IshopDetails }) => {
  const primaryColor = useCSSVariable("--color-primary") as string;
  return (
    <View className="gap-1">
      <View className="flex-row gap-1 items-center flex-1">
        <ThemedText numberOfLines={1} className="text-2xl font-semibold flex-1">
          {data.shopName}
        </ThemedText>
        <Chip.Root size="sm" variant="soft">
          <Chip.Label>{data.shopCountry}</Chip.Label>
        </Chip.Root>
      </View>
      <View className="flex-row items-center gap-1">
        <SymbolView
          name={{
            android: "location_on",
            ios: "mappin.and.ellipse",
          }}
          size={16}
          tintColor={primaryColor}
        />
        <ThemedText className="text-sm text-primary underline flex-1">
          {data.shopAddress}
        </ThemedText>
      </View>
    </View>
  );
};
