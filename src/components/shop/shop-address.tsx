import { View } from "react-native";
import { Separator } from "../ui/separator";
import { Surface } from "../ui/surface";
import { StyledSymbolView } from "../ui/symbol-view";
import { ThemedText } from "../ui/themed-text";

export const ShopAddress = ({ address }: { address: string }) => {
  return (
    <Surface className="rounded-2xl p-0 border border-separator">
      <View className="flex-row items-center gap-x-2 p-3.5">
        <StyledSymbolView
          name={{
            android: "location_on",
            ios: "mappin.and.ellipse",
          }}
          tintColorClassName={"accent-primary"}
          size={20}
        />
        <ThemedText className="font-semibold">Address</ThemedText>
      </View>
      <Separator />
      <View className="p-3">
        <ThemedText className="text-muted text-xs">{address}</ThemedText>
      </View>
    </Surface>
  );
};
