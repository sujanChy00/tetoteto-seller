import { UiSpinnerProps } from "@/types/components";
import { CircularProgressIndicator } from "@expo/ui/jetpack-compose";
import { height, width } from "@expo/ui/jetpack-compose/modifiers";

export const UISpinner = ({
  size = 35,
  color,
  strokeWidth = 2,
}: UiSpinnerProps) => {
  return (
    <CircularProgressIndicator
      color={color}
      strokeWidth={strokeWidth}
      modifiers={[height(size), width(size)]}
    />
  );
};
