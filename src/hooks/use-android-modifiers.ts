import {
  fillMaxWidth,
  height,
  width,
} from "@expo/ui/jetpack-compose/modifiers";
import { useMemo } from "react";

interface Props {
  useFullWidth?: boolean;
  height?: number;
  width?: number;
}

export const useAndroidModifiers = ({
  useFullWidth,
  height: buttonHeight,
  width: buttonWidth,
}: Props) => {
  const fullWidthModifier = useMemo(
    () => (useFullWidth ? [fillMaxWidth()] : []),
    [useFullWidth],
  );
  const heightModifier = useMemo(
    () => (buttonHeight ? [height(buttonHeight)] : []),
    [buttonHeight],
  );
  const widthModifier = useMemo(
    () => (buttonWidth ? [width(buttonWidth)] : []),
    [buttonWidth],
  );

  return { fullWidthModifier, heightModifier, widthModifier };
};
