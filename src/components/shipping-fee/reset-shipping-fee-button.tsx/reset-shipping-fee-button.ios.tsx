import { Host } from "@/components/ui/host";
import { useLanguage } from "@/hooks/use-language";
import { Button, Text } from "@expo/ui/swift-ui";
import { buttonStyle, controlSize } from "@expo/ui/swift-ui/modifiers";

interface ResetShippingFeeButtonProps {
  onPress: () => void;
}

export const ResetShippingFeeButton = ({
  onPress,
}: ResetShippingFeeButtonProps) => {
  const { t } = useLanguage();
  return (
    <Host matchContents>
      <Button
        onPress={onPress}
        modifiers={[controlSize("small"), buttonStyle("glass")]}
      >
        <Text>{t("reset")}</Text>
      </Button>
    </Host>
  );
};
