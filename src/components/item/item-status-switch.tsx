import { useLanguage } from "@/hooks/use-language";
import { useToggleItemStatus } from "@/mutation/item-mutation";
import { Switch } from "@expo/ui";
import { Pressable, View } from "react-native";
import { Host } from "../ui/host";
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
    <Pressable
      onPress={() => handleToggle()}
      accessibilityRole="switch"
      disabled={isPending}
      accessibilityLabel="Recommended"
      accessibilityState={{ checked: !value }}
      className={"flex-row items-center justify-between gap-3"}
    >
      <ThemedText className="text-xs font-medium">
        {t("can_be_sent_in_cool_cart")}
      </ThemedText>
      <View pointerEvents="none">
        <Host matchContents>
          <Switch
            disabled={isPending}
            value={value}
            onValueChange={() => {
              handleToggle();
            }}
          />
        </Host>
      </View>
    </Pressable>
  );
};
