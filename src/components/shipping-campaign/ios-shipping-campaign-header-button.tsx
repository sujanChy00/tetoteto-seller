import { Button } from "@expo/ui/swift-ui";
import { buttonStyle, controlSize } from "@expo/ui/swift-ui/modifiers";
import { useRouter } from "expo-router";

export const IosShippingCampaignHeaderButton = () => {
  const router = useRouter();
  return (
    <Button
      onPress={() => {
        router.push({
          pathname: "/shipping-campaign/add",
        });
      }}
      label="Add"
      modifiers={[controlSize("small"), buttonStyle("glass")]}
    />
  );
};
