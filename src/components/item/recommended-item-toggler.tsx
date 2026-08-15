import {
  useAddRecommendedItems,
  useRemoveRecommendedItems,
} from "@/mutation/item-mutation";
import { Switch } from "@expo/ui";
import { Pressable, View } from "react-native";
import { twMerge } from "tailwind-merge";
import { Host } from "../ui/host";
import { ThemedText } from "../ui/themed-text";

type Props = {
  itemId: string;
  recommended: boolean;
  disabled?: boolean;
  label?: string;
  className?: string;
};

export const RecommendedItemToggler = ({
  itemId,
  recommended,
  disabled,
  label,
  className,
}: Props) => {
  const { mutateAsync: addToRecommended, isPending: isPendingAdd } =
    useAddRecommendedItems();
  const { mutateAsync: removeFromRecommended, isPending: isPendingRemove } =
    useRemoveRecommendedItems();

  const isPending = isPendingAdd || isPendingRemove;
  const isDisabled = isPending || disabled;

  const handleToggle = () => {
    if (isPending || disabled) return;

    if (recommended) {
      removeFromRecommended({ itemId });
    } else {
      addToRecommended({ itemId });
    }
  };

  return (
    <Pressable
      disabled={isDisabled}
      onPress={handleToggle}
      accessibilityRole="switch"
      accessibilityLabel="Recommended"
      accessibilityState={{ checked: recommended }}
      className={twMerge("flex-row items-center", className)}
    >
      {label && (
        <ThemedText className="text-xs font-medium">{label}</ThemedText>
      )}
      <View pointerEvents="none">
        <Host matchContents>
          <Switch
            value={recommended}
            onValueChange={handleToggle}
            disabled={isDisabled}
          />
        </Host>
      </View>
    </Pressable>
  );
};
