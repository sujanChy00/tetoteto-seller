import { useAppTheme } from "@/context/app-theme-provider";
import { UiSpinnerProps } from "@/types/components";
import { CircularProgressIndicator } from "@expo/ui/jetpack-compose";
import { height, width } from "@expo/ui/jetpack-compose/modifiers";

export const Spinner = ({
  size = 35,
  color,
  strokeWidth = 2,
}: UiSpinnerProps) => {
  const { colors } = useAppTheme();
  return (
    <CircularProgressIndicator
      color={colors.background ?? color}
      strokeWidth={strokeWidth}
      modifiers={[height(size), width(size)]}
    />
  );
};
