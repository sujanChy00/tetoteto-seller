import { shipmentFilterOptions } from "@/constants/data";
import { useLocalSearchParams, useRouter } from "expo-router";
import light from "expo-symbols/androidWeights/light";
import { View } from "react-native";
import { Menu } from "../ui/menu";
import { StyledSymbolView } from "../ui/symbol-view";
import { ThemedText } from "../ui/themed-text";

export const ShipmentFilters = () => {
  const router = useRouter();
  const params = useLocalSearchParams<{
    filter?: string;
  }>();
  const selectedValue = shipmentFilterOptions.find(
    (item) => item.value === params.filter,
  );

  return (
    <Menu
      onValueChange={(v) => {
        router.setParams({ filter: v });
      }}
      nativeOptions={shipmentFilterOptions.map((item) => ({
        title: item.label,
        id: item.value,
        state: item.value === params.filter ? "on" : "off",
      }))}
    >
      <View className="bg-default flex-row items-center justify-center h-12 px-4 w-fit rounded-3xl">
        <ThemedText className="text-primary capitalize">
          {selectedValue?.label ?? "current"}
        </ThemedText>
        <StyledSymbolView
          weight={{ ios: "regular", android: light }}
          name={{
            android: "keyboard_arrow_down",
            ios: "chevron.down",
          }}
          tintColorClassName={"accent-primary"}
        />
      </View>
    </Menu>
  );
};
