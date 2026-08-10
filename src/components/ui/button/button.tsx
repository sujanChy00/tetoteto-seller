import { UIButtonProps } from "@/types/components";
import {
  ElevatedButton,
  FilledTonalButton,
  OutlinedButton,
  TextButton,
  Button as UIButton,
} from "@expo/ui/jetpack-compose";
import { weight } from "@expo/ui/jetpack-compose/modifiers";

export const Button = ({
  variant = "default",
  onPress,
  children,
  height,
  width,
  disabled,
}: UIButtonProps) => {
  if (variant === "filled")
    return (
      <FilledTonalButton
        enabled={!disabled}
        onClick={onPress}
        modifiers={[weight(1)]}
      >
        {children}
      </FilledTonalButton>
    );
  if (variant === "outlined")
    return (
      <OutlinedButton
        onClick={onPress}
        enabled={!disabled}
        modifiers={[weight(1)]}
      >
        {children}
      </OutlinedButton>
    );
  if (variant === "elevated")
    return (
      <ElevatedButton
        enabled={!disabled}
        onClick={onPress}
        modifiers={[weight(1)]}
      >
        {children}
      </ElevatedButton>
    );
  if (variant === "text")
    return (
      <TextButton enabled={!disabled} onClick={onPress} modifiers={[weight(1)]}>
        {children}
      </TextButton>
    );

  return (
    <UIButton enabled={!disabled} onClick={onPress} modifiers={[weight(1)]}>
      {children}
    </UIButton>
  );
};
