import { fillMaxWidth } from "@expo/ui/jetpack-compose/modifiers";
import { useMemo } from "react";

interface Props {
  useFullWidth?: boolean;
}

export const useAndroidModifiers = ({ useFullWidth }: Props) => {
  const fullWidthModifier = useMemo(
    () => (useFullWidth ? [fillMaxWidth()] : []),
    [useFullWidth],
  );

  return { fullWidthModifier };
};
