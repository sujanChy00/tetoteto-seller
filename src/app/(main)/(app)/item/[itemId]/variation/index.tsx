import { ItemVariationCard } from "@/components/item/item-variation/item-variation-card";
import { ListEmpty } from "@/components/ui/list/list-empty";
import { ListSeparator } from "@/components/ui/list/list-separator";
import { useGetItemDetail } from "@/queries/item-query";
import { IItemVaritions } from "@/types";
import PLUST_ICON from "@expo/material-symbols/add.xml";
import { LegendList } from "@legendapp/list/react-native";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useMemo, useState } from "react";
import { View } from "react-native";

const renderSeparator = () => <ListSeparator />;

const ItemVariationDetailScreen = () => {
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);
  const { itemId } = useLocalSearchParams<{ itemId: string }>();
  const { data, isPending, refetch } = useGetItemDetail(itemId);

  const variations = useMemo(() => data?.itemDetails.variations, [data]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refetch().finally(() => setRefreshing(false));
  }, [refetch]);

  const keyExtractor = useCallback(
    ({ weight }: IItemVaritions) => weight.toString(),
    [],
  );
  const ListEmptyComponent = useCallback(
    () => (
      <ListEmpty isPending={isPending} emptyStateMessage="no_item_variations" />
    ),
    [isPending],
  );

  const renderItem = useCallback(
    ({ item }: { item: IItemVaritions }) => (
      <ItemVariationCard variation={item} />
    ),
    [],
  );

  return (
    <View className="flex-1">
      <Stack.Title>Variations</Stack.Title>
      <Stack.Toolbar placement="right">
        <Stack.Toolbar.Button
          variant="prominent"
          onPress={() => {
            router.push({
              pathname: "/item/[itemId]/variation/add",
              params: {
                itemId,
              },
            });
          }}
        >
          <Stack.Toolbar.Icon sf="plus" src={PLUST_ICON} />
          <Stack.Toolbar.Label>Add</Stack.Toolbar.Label>
        </Stack.Toolbar.Button>
      </Stack.Toolbar>
      <LegendList
        ItemSeparatorComponent={renderSeparator}
        data={variations}
        renderItem={renderItem}
        refreshing={refreshing}
        keyExtractor={keyExtractor}
        maintainVisibleContentPosition
        showsVerticalScrollIndicator={false}
        contentContainerClassName="p-2"
        onRefresh={onRefresh}
        recycleItems
        estimatedItemSize={170}
        ListEmptyComponent={ListEmptyComponent}
      />
    </View>
  );
};

export default ItemVariationDetailScreen;
