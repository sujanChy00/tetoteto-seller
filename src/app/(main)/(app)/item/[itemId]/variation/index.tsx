import PLUST_ICON from "@expo/material-symbols/add.xml";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { View } from "react-native";

const ItemVariationDetailScreen = () => {
  const router = useRouter();
  const { itemId } = useLocalSearchParams<{ itemId: string }>();
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
    </View>
  );
};

export default ItemVariationDetailScreen;
