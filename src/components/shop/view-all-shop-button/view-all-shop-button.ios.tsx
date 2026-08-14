import { Button } from "@expo/ui/swift-ui";
import { buttonStyle, controlSize } from "@expo/ui/swift-ui/modifiers";
import { useRouter } from "expo-router";

export const ViewAllShopButton = () => {
  const router = useRouter();
  return (
    <Button
      label="view all"
      systemImage="arrow.right"
      modifiers={[controlSize("small"), buttonStyle("glass")]}
      onPress={() => {
        router.push("/shop");
      }}
    />
  );
};
