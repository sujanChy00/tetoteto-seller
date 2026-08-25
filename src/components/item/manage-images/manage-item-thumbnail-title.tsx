import { View } from "react-native";
import { ThemedText } from "../../ui/themed-text";

interface Props {
  images: string[];
}

export const ManageItemThumbnailTitle = ({ images }: Props) => {
  return (
    <View>
      <View className="flex-row items-center gap-3">
        <ThemedText className="text-2xl font-semibold flex-1">
          Order Your Images
        </ThemedText>
        <View className="border-border border rounded-full px-2 py-1">
          <ThemedText className="text-muted text-xs">
            {images.length} / 4
          </ThemedText>
        </View>
      </View>
      <ThemedText className="text-muted">
        Drag the handle to rearrange. Choose one image as your thumbnail.
      </ThemedText>
    </View>
  );
};
