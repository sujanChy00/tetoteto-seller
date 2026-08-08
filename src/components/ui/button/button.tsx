import { useAndroidModifiers } from "@/hooks/use-android-modifiers";
import { UIButtonProps } from "@/types/components";
import {
  ElevatedButton,
  FilledTonalButton,
  OutlinedButton,
  TextButton,
  Button as UIButton,
} from "@expo/ui/jetpack-compose";
import { padding } from "@expo/ui/jetpack-compose/modifiers";

export const Button = ({
  variant = "default",
  onPress,
  paddingHorizontal = 0,
  paddingVertical = 0,
  useFullWidth = false,
  children,
}: UIButtonProps) => {
  const { fullWidthModifier } = useAndroidModifiers({ useFullWidth });

  if (variant === "filled")
    return (
      <FilledTonalButton
        onClick={onPress}
        modifiers={[
          ...fullWidthModifier,
          padding(
            paddingHorizontal,
            paddingVertical,
            paddingHorizontal,
            paddingVertical,
          ),
        ]}
      >
        {children}
      </FilledTonalButton>
    );
  if (variant === "outlined")
    return (
      <OutlinedButton
        onClick={onPress}
        modifiers={[
          ...fullWidthModifier,
          padding(
            paddingHorizontal,
            paddingVertical,
            paddingHorizontal,
            paddingVertical,
          ),
        ]}
      >
        {children}
      </OutlinedButton>
    );
  if (variant === "elevated")
    return (
      <ElevatedButton
        onClick={onPress}
        modifiers={[
          ...fullWidthModifier,
          padding(
            paddingHorizontal,
            paddingVertical,
            paddingHorizontal,
            paddingVertical,
          ),
        ]}
      >
        {children}
      </ElevatedButton>
    );
  if (variant === "text")
    return (
      <TextButton
        onClick={onPress}
        modifiers={[
          ...fullWidthModifier,
          padding(
            paddingHorizontal,
            paddingVertical,
            paddingHorizontal,
            paddingVertical,
          ),
        ]}
      >
        {children}
      </TextButton>
    );

  return (
    <UIButton
      onClick={onPress}
      modifiers={[
        ...fullWidthModifier,
        padding(
          paddingHorizontal,
          paddingVertical,
          paddingHorizontal,
          paddingVertical,
        ),
      ]}
    >
      {children}
    </UIButton>
  );
};
