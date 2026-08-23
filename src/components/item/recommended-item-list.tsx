import { RecommendedItems } from "@/types";
import { View } from "react-native";
import { ThemedText } from "../ui/themed-text";
import { RecommendedItemCard } from "./recommended-item-card";

export const RecommendedItemsList = ({
  items,
}: {
  items?: RecommendedItems[];
}) => {
  if (!items || items.length === 0) return null;
  return (
    <View className="gap-3">
      <ThemedText className="text-lg font-bold font-serif">
        Recommended Items
      </ThemedText>
      <View className="gap-3">
        {items.map((item) => (
          <RecommendedItemCard key={item.itemId} item={item} />
        ))}
      </View>
    </View>
  );
};
