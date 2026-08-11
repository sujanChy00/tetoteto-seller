import { UIButtonProps } from "@/types/components";
import {
  ElevatedButton,
  FilledTonalButton,
  OutlinedButton,
  TextButton,
  Button as UIButton,
} from "@expo/ui/jetpack-compose";
import {
  height,
  size,
  weight,
  width,
} from "@expo/ui/jetpack-compose/modifiers";
import { useMemo } from "react";

export const Button = ({
  variant = "default",
  onPress,
  children,
  height: buttonHeight,
  width: buttonWidth,
  disabled,
}: UIButtonProps) => {
  const butonModifiers = useMemo(() => {
    if (buttonHeight && buttonWidth) {
      return [weight(1), size(buttonHeight, buttonWidth)];
    }
    return [
      weight(1),
      ...(buttonHeight ? [height(buttonHeight)] : []),
      ...(buttonWidth ? [width(buttonWidth)] : []),
    ];
  }, [buttonHeight, buttonWidth]);

  if (variant === "filled")
    return (
      <FilledTonalButton
        enabled={!disabled}
        onClick={onPress}
        modifiers={butonModifiers}
      >
        {children}
      </FilledTonalButton>
    );
  if (variant === "outlined")
    return (
      <OutlinedButton
        onClick={onPress}
        enabled={!disabled}
        modifiers={butonModifiers}
      >
        {children}
      </OutlinedButton>
    );
  if (variant === "elevated")
    return (
      <ElevatedButton
        enabled={!disabled}
        onClick={onPress}
        modifiers={butonModifiers}
      >
        {children}
      </ElevatedButton>
    );
  if (variant === "text")
    return (
      <TextButton
        enabled={!disabled}
        onClick={onPress}
        modifiers={butonModifiers}
      >
        {children}
      </TextButton>
    );

  return (
    <UIButton enabled={!disabled} onClick={onPress} modifiers={butonModifiers}>
      {children}
    </UIButton>
  );
};
