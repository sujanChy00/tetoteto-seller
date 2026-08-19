import { useLanguage } from "@/hooks/use-language";
import { useToggleItemStatus } from "@/mutation/item-mutation";
import { View } from "react-native";
import { SwitchInput } from "../ui/switch-input";
import { ThemedText } from "../ui/themed-text";

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
    <View
      accessibilityLabel="Item Status"
      accessibilityState={{ checked: value }}
      className="flex-row items-center justify-between gap-3"
    >
      <ThemedText className="text-xs font-medium">{t("disabled")}</ThemedText>
      <SwitchInput
        disabled={isPending}
        value={value}
        onValueChange={handleToggle}
      />
    </View>
  );
};
