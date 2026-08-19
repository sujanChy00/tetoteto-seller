import { useDeleteItem } from "@/mutation/item-mutation";
import { Icon } from "@expo/ui";
import { GlassView } from "expo-glass-effect";
import { useRouter } from "expo-router";
import { SymbolView } from "expo-symbols";
import { useMemo } from "react";
import { Alert, Platform, StyleSheet, View } from "react-native";
import { Menu } from "../ui/menu";

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
      <SymbolView
        name={{
          android: "more_horiz",
          ios: "ellipsis",
        }}
      />
    </GlassView>
  ),
  android: (
    <View
      hitSlop={8}
      className="size-8 rounded-full items-center justify-center"
    >
      <SymbolView
        name={{
          android: "more_horiz",
          ios: "ellipsis",
        }}
      />
    </View>
  ),
});

const EDIT_ICON = Icon.select({
  ios: "pencil",
  android: import("@expo/material-symbols/edit.xml"),
});

const COPY_ICON = Icon.select({
  ios: "doc.on.doc",
  android: import("@expo/material-symbols/content_copy.xml"),
});

const VARIATION_ICON = Icon.select({
  ios: "square.on.square",
  android: import("@expo/material-symbols/tune.xml"),
});

const MANAGE_IMAGES_ICON = Icon.select({
  ios: "photo.on.rectangle.angled",
  android: import("@expo/material-symbols/photo_library.xml"),
});

const DELETE_ICON = Icon.select({
  ios: "trash",
  android: import("@expo/material-symbols/delete.xml"),
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

  const options = useMemo(
    () => [
      {
        title: "Edit",
        id: "edit",
        image: EDIT_ICON,
      },
      {
        title: "Copy",
        id: "copy",
        image: COPY_ICON,
      },
      {
        title: "Variation",
        id: "variation",
        image: VARIATION_ICON,
      },
      {
        title: "Manage Images",
        id: "manage-images",
        image: MANAGE_IMAGES_ICON,
      },
      {
        title: "Delete",
        id: "delete",
        image: DELETE_ICON,
        attributes: {
          destructive: true,
        },
      },
    ],
    [],
  );

  const handleValueChange = (value: string) => {
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

  return (
    <Menu onValueChange={handleValueChange} nativeOptions={options}>
      {Trigger}
    </Menu>
  );
};
