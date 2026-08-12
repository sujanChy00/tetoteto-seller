import { ActivityIndicator, Modal, View } from "react-native";
import { ThemedText } from "./themed-text";

interface Props {
  isVisible: boolean;
  loadingText?: string;
}

export const FullScreenSpinner = ({
  isVisible,
  loadingText = "Please wait...",
}: Props) => {
  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={() => {
        // Intentionally do nothing.
        // Prevents Android back button from dismissing the modal.
      }}
    >
      <View className="flex-1 items-center justify-center bg-black/50">
        <View className="items-center rounded-lg bg-background px-6 py-5">
          <ActivityIndicator size="large" />
          <ThemedText className="mt-3">{loadingText}</ThemedText>
        </View>
      </View>
    </Modal>
  );
};
