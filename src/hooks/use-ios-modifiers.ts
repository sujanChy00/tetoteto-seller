import { border, frame } from "@expo/ui/swift-ui/modifiers";
import { useMemo } from "react";
import { useCSSVariable } from "uniwind";

interface Props {
  useFullWidth?: boolean;
  isInvalid?: boolean;
}

export const useIOSModifiers = ({ useFullWidth, isInvalid }: Props) => {
  const colorDanger = useCSSVariable("--color-danger");

  const fullWidthModifier = useMemo(
    () =>
      useFullWidth
        ? [
            frame({
              maxWidth: Infinity,
            }),
          ]
        : [],
    [useFullWidth],
  );
  const invalidBorderModifiers = useMemo(
    () =>
      isInvalid ? [border({ color: colorDanger as string, width: 1 })] : [],
    [isInvalid],
  );

  return { fullWidthModifier, invalidBorderModifiers };
};
