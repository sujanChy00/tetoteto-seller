import { ItemFilters } from "@/components/item/item-filters";
import { ThemedText } from "@/components/ui/themed-text";
import { useLocalSearchParams } from "expo-router";

const ItemScreen = () => {
  const { query, sort, order } = useLocalSearchParams<{
    query?: string;
    sort?: string;
    order?: string;
  }>();
  return (
    <>
      <ThemedText>Query: {query}</ThemedText>
      <ThemedText>Sort: {sort}</ThemedText>
      <ThemedText>Order: {order}</ThemedText>
      <ItemFilters />
    </>
  );
};

export default ItemScreen;
