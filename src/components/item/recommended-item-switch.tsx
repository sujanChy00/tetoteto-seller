import {
  useAddRecommendedItems,
  useRemoveRecommendedItems,
} from "@/mutation/item-mutation";
import { View } from "react-native";
import { twMerge } from "tailwind-merge";
import { SwitchInput } from "../ui/switch-input";
import { ThemedText } from "../ui/themed-text";

type Props = {
  itemId: string;
  recommended: boolean;
  disabled?: boolean;
  label?: string;
  className?: string;
};

export const RecommendedItemSwitch = ({
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
    <View
      accessibilityLabel="Recommended Item"
      accessibilityState={{ checked: recommended }}
      className={twMerge("flex-row items-center", className)}
    >
      {label && (
        <ThemedText className="text-xs font-medium">{label}</ThemedText>
      )}
      <SwitchInput
        value={recommended}
        onValueChange={handleToggle}
        disabled={isDisabled}
      />
    </View>
  );
};
