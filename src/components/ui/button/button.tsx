import { UIButtonProps } from "@/types/components";
import {
  ElevatedButton,
  FilledTonalButton,
  OutlinedButton,
  TextButton,
  Button as UIButton,
} from "@expo/ui/jetpack-compose";
import { height, weight, width } from "@expo/ui/jetpack-compose/modifiers";

export const Button = ({
  variant = "default",
  onPress,
  children,
  height: buttonHeight,
  width: buttonWidth,
  disabled,
}: UIButtonProps) => {
  if (variant === "filled")
    return (
      <FilledTonalButton
        enabled={!disabled}
        onClick={onPress}
        modifiers={[
          weight(1),
          ...(buttonHeight ? [height(buttonHeight)] : []),
          ...(buttonWidth ? [width(buttonWidth)] : []),
        ]}
      >
        {children}
      </FilledTonalButton>
    );
  if (variant === "outlined")
    return (
      <OutlinedButton
        onClick={onPress}
        enabled={!disabled}
        modifiers={[
          weight(1),
          ...(buttonHeight ? [height(buttonHeight)] : []),
          ...(buttonWidth ? [width(buttonWidth)] : []),
        ]}
      >
        {children}
      </OutlinedButton>
    );
  if (variant === "elevated")
    return (
      <ElevatedButton
        enabled={!disabled}
        onClick={onPress}
        modifiers={[
          weight(1),
          ...(buttonHeight ? [height(buttonHeight)] : []),
          ...(buttonWidth ? [width(buttonWidth)] : []),
        ]}
      >
        {children}
      </ElevatedButton>
    );
  if (variant === "text")
    return (
      <TextButton
        enabled={!disabled}
        onClick={onPress}
        modifiers={[
          weight(1),
          ...(buttonHeight ? [height(buttonHeight)] : []),
          ...(buttonWidth ? [width(buttonWidth)] : []),
        ]}
      >
        {children}
      </TextButton>
    );

  return (
    <UIButton
      enabled={!disabled}
      onClick={onPress}
      modifiers={[
        weight(1),
        ...(buttonHeight ? [height(buttonHeight)] : []),
        ...(buttonWidth ? [width(buttonWidth)] : []),
      ]}
    >
      {children}
    </UIButton>
  );
};
