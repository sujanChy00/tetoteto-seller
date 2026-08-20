import { IshopDetails } from "@/types";
import { View } from "react-native";
import { Chip } from "../ui/chip";
import { StyledSymbolView } from "../ui/symbol-view";
import { ThemedText } from "../ui/themed-text";

export const ShopTitle = ({ data }: { data: IshopDetails }) => {
  return (
    <View className="gap-1">
      <View className="flex-row gap-1 items-center flex-1">
        <ThemedText numberOfLines={1} className="text-2xl font-semibold flex-1">
          {data.shopName}
        </ThemedText>
        <Chip size="sm" variant="soft">
          <Chip.Label>{data.shopCountry}</Chip.Label>
        </Chip>
      </View>
      <View className="flex-row items-center gap-1">
        <StyledSymbolView
          name={{
            android: "location_on",
            ios: "mappin.and.ellipse",
          }}
          size={16}
          tintColorClassName={"accent-primary"}
        />
        <ThemedText className="text-sm text-primary underline flex-1">
          {data.shopAddress}
        </ThemedText>
      </View>
    </View>
  );
};
