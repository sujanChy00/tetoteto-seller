import { useLanguage } from "@/hooks/use-language";
import { useToggleItemStatus } from "@/mutation/item-mutation";
import { SwitchInput } from "../ui/switch-input";

type Props = {
  value: boolean;
  itemId: string;
};

export const ItemStatusSwitch = ({ itemId, value }: Props) => {
  const { t } = useLanguage();
  const { mutate, isPending } = useToggleItemStatus();

  const handleToggle = () => {
    mutate(itemId);
  };

  return (
    <SwitchInput
      className="justify-between"
      label={t("disabled")}
      disabled={isPending}
      value={value}
      onValueChange={handleToggle}
    />
  );
};
