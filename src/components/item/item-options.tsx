import { itemOptionsList } from "@/constants/data";
import { useDeleteItem } from "@/mutation/item-mutation";
import { GlassView } from "expo-glass-effect";
import { useRouter } from "expo-router";
import { useCallback } from "react";
import { Alert, Platform, StyleSheet, View } from "react-native";
import { Menu } from "../ui/menu";
import { StyledSymbolView } from "../ui/symbol-view";

const styles = StyleSheet.create({
  container: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
});

const Trigger = Platform.select({
  ios: (
    <GlassView hitSlop={8} style={styles.container}>
      <StyledSymbolView
        tintColorClassName="accent-foreground"
        name={{
          android: "more_horiz",
          ios: "ellipsis",
        }}
      />
    </GlassView>
  ),
  android: (
    <View
      hitSlop={20}
      className="size-8 rounded-full items-center justify-center"
    >
      <StyledSymbolView
        tintColorClassName="accent-foreground"
        name={{
          android: "more_horiz",
          ios: "ellipsis",
        }}
      />
    </View>
  ),
});

export const ItemOptions = ({ itemId }: { itemId: string }) => {
  const router = useRouter();
  const { mutateAsync: deleteItem, isPending } = useDeleteItem({
    onSuccess: () => {
      router.back();
    },
  });

  const handleDelete = async () => {
    await deleteItem(itemId);
  };

  const handleValueChange = useCallback(() => {
    (value: string) => {
      switch (value) {
        case "edit":
          router.push({
            pathname: "/item/[itemId]/edit",
            params: { itemId },
          });
          break;
        case "copy":
          router.push({
            pathname: "/item/[itemId]/copy",
            params: { itemId },
          });
          break;
        case "variation":
          router.push({
            pathname: "/item/[itemId]/variation",
            params: { itemId },
          });
          break;
        case "manage-images":
          router.push({
            pathname: "/item/[itemId]/manage-image",
            params: { itemId },
          });
          break;
        case "delete":
          Alert.alert("Delete", "Are you sure you want to delete this item?", [
            { text: "Cancel", style: "cancel" },
            { text: "Delete", style: "destructive", onPress: handleDelete },
          ]);
          break;
      }
    };
  }, []);

  return (
    <Menu onValueChange={handleValueChange} nativeOptions={itemOptionsList}>
      {Trigger}
    </Menu>
  );
};
