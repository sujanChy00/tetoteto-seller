import { useDeleteItem } from "@/mutation/item-mutation";
import MORE_HORIZ_ICON from "@expo/material-symbols/more_horiz.xml";
import { Icon } from "@expo/ui";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { Alert } from "react-native";

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

export const ItemOptions = () => {
  const { itemId } = useLocalSearchParams<{ itemId: string }>();
  const router = useRouter();
  const { mutateAsync: deleteItem } = useDeleteItem({
    onSuccess: () => {
      router.back();
    },
  });

  const handleDelete = async () => {
    await deleteItem(itemId);
  };

  return (
    <Stack.Toolbar.Menu>
      <Stack.Toolbar.Icon sf="ellipsis.circle" src={MORE_HORIZ_ICON} />
      <Stack.Toolbar.MenuAction
        icon={EDIT_ICON}
        onPress={() => {
          router.push({
            pathname: "/item/[itemId]/edit",
            params: { itemId },
          });
        }}
      >
        Edit
      </Stack.Toolbar.MenuAction>
      <Stack.Toolbar.MenuAction
        icon={COPY_ICON}
        onPress={() => {
          router.push({
            pathname: "/item/[itemId]/copy",
            params: { itemId },
          });
        }}
      >
        Copy
      </Stack.Toolbar.MenuAction>
      <Stack.Toolbar.MenuAction
        icon={VARIATION_ICON}
        onPress={() => {
          router.push({
            pathname: "/item/[itemId]/variation",
            params: { itemId },
          });
        }}
      >
        Variation
      </Stack.Toolbar.MenuAction>
      <Stack.Toolbar.MenuAction
        icon={MANAGE_IMAGES_ICON}
        onPress={() => {
          router.push({
            pathname: "/item/[itemId]/manage-image",
            params: { itemId },
          });
        }}
      >
        Manage Images
      </Stack.Toolbar.MenuAction>
      <Stack.Toolbar.MenuAction
        destructive
        icon={DELETE_ICON}
        onPress={() => {
          Alert.alert("Delete", "Are you sure you want to delete this item?", [
            { text: "Cancel", style: "cancel" },
            { text: "Delete", style: "destructive", onPress: handleDelete },
          ]);
        }}
      >
        Delete
      </Stack.Toolbar.MenuAction>
    </Stack.Toolbar.Menu>
  );
};
