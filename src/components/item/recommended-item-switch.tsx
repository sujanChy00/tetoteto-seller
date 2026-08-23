import {
  useAddRecommendedItems,
  useRemoveRecommendedItems,
} from "@/mutation/item-mutation";
import { SwitchInput } from "../ui/switch-input";

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
    <SwitchInput
      className={className}
      label={label}
      labelClassName="text-xs font-medium"
      value={recommended}
      onValueChange={handleToggle}
      disabled={isDisabled}
    />
  );
};
