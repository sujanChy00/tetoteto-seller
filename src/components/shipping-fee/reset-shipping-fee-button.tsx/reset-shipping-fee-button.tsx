import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/use-language";

interface ResetShippingFeeButtonProps {
  onPress: () => void;
}

export const ResetShippingFeeButton = ({
  onPress,
}: ResetShippingFeeButtonProps) => {
  const { t } = useLanguage();
  return (
    <Button.DangerSoft className="h-8" onPress={onPress}>
      <Button.DangerSoftLabel>{t("reset")} </Button.DangerSoftLabel>
    </Button.DangerSoft>
  );
};
