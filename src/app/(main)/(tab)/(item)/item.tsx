import { ItemFilters } from "@/components/item/item-filters";
import { useNativeState } from "@expo/ui/jetpack-compose";
import { useLocalSearchParams } from "expo-router";
import { View } from "react-native";

const ItemScreen = () => {
  const text = useNativeState("");
  const { query, sort, order } = useLocalSearchParams<{
    query?: string;
    sort?: string;
    order?: string;
  }>();
  return (
    <View className="flex-1">
      <ItemFilters />
    </View>
  );
};

export default ItemScreen;
