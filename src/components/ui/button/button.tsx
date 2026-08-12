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
  fillFullWidth = true,
}: UIButtonProps) => {
  const buttonSizeModifiers = useMemo(() => {
    if (buttonHeight && buttonWidth) {
      return [size(buttonHeight, buttonWidth)];
    }
    return [
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

  const buttonWidthModifiers = useMemo(() => {
    if (fillFullWidth) {
      return [weight(1)];
    }
    return [];
  }, [fillFullWidth]);

  if (variant === "filled")
    return (
      <FilledTonalButton
        contentPadding={contentPadding}
        enabled={!disabled}
        onClick={onPress}
        modifiers={[...buttonSizeModifiers, ...buttonWidthModifiers]}
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
        modifiers={[...buttonSizeModifiers, ...buttonWidthModifiers]}
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
        modifiers={[...buttonSizeModifiers, ...buttonWidthModifiers]}
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
        modifiers={[...buttonSizeModifiers, ...buttonWidthModifiers]}
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
      modifiers={[...buttonSizeModifiers, ...buttonWidthModifiers]}
      colors={{
        containerColor: backgroundColor,
      }}
    >
      {children}
    </UIButton>
  );
};
