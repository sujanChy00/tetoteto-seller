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
  backgroundColor,
  paddingHorizontal,
  paddingVertical,
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

  const contentPadding = useMemo(() => {
    return {
      bottom: paddingVertical,
      end: paddingHorizontal,
      start: paddingHorizontal,
      top: paddingVertical,
    };
  }, [paddingHorizontal, paddingVertical]);

  if (variant === "filled")
    return (
      <FilledTonalButton
        contentPadding={contentPadding}
        enabled={!disabled}
        onClick={onPress}
        modifiers={butonModifiers}
        colors={{
          containerColor: backgroundColor,
        }}
      >
        {children}
      </FilledTonalButton>
    );
  if (variant === "outlined")
    return (
      <OutlinedButton
        contentPadding={contentPadding}
        onClick={onPress}
        enabled={!disabled}
        modifiers={butonModifiers}
        colors={{
          containerColor: backgroundColor,
        }}
      >
        {children}
      </OutlinedButton>
    );
  if (variant === "elevated")
    return (
      <ElevatedButton
        contentPadding={contentPadding}
        enabled={!disabled}
        onClick={onPress}
        modifiers={butonModifiers}
        colors={{
          containerColor: backgroundColor,
        }}
      >
        {children}
      </ElevatedButton>
    );
  if (variant === "text")
    return (
      <TextButton
        contentPadding={contentPadding}
        enabled={!disabled}
        onClick={onPress}
        modifiers={butonModifiers}
        colors={{
          containerColor: backgroundColor,
        }}
      >
        {children}
      </TextButton>
    );

  return (
    <UIButton
      contentPadding={contentPadding}
      enabled={!disabled}
      onClick={onPress}
      modifiers={butonModifiers}
      colors={{
        containerColor: backgroundColor,
      }}
    >
      {children}
    </UIButton>
  );
};
