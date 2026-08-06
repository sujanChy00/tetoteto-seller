import { UIButtonProps } from "@/types/components";
import {
  ElevatedButton,
  FilledTonalButton,
  OutlinedButton,
  TextButton,
  Button as UIButton,
} from "@expo/ui/jetpack-compose";
import {
  fillMaxWidth,
  ModifierConfig,
  padding,
} from "@expo/ui/jetpack-compose/modifiers";

export const Button = ({
  variant = "default",
  onPress,
  ...rest
}: UIButtonProps & { modifiers?: ModifierConfig[] }) => {
  if (variant === "filled")
    return (
      <FilledTonalButton
        onClick={onPress}
        modifiers={[
          fillMaxWidth(),
          padding(16, 0, 16, 0),
          ...(rest.modifiers ?? []),
        ]}
      >
        {rest.children}
      </FilledTonalButton>
    );
  if (variant === "outlined")
    return (
      <OutlinedButton
        onClick={onPress}
        modifiers={[
          fillMaxWidth(),
          padding(16, 0, 16, 0),
          ...(rest.modifiers ?? []),
        ]}
      >
        {rest.children}
      </OutlinedButton>
    );
  if (variant === "elevated")
    return (
      <ElevatedButton
        onClick={onPress}
        modifiers={[
          fillMaxWidth(),
          padding(16, 0, 16, 0),
          ...(rest.modifiers ?? []),
        ]}
      >
        {rest.children}
      </ElevatedButton>
    );
  if (variant === "text")
    return (
      <TextButton
        onClick={onPress}
        modifiers={[
          fillMaxWidth(),
          padding(16, 0, 16, 0),
          ...(rest.modifiers ?? []),
        ]}
      >
        {rest.children}
      </TextButton>
    );

  return (
    <UIButton
      onClick={onPress}
      modifiers={[
        fillMaxWidth(),
        padding(16, 0, 16, 0),
        ...(rest.modifiers ?? []),
      ]}
    >
      {rest.children}
    </UIButton>
  );
};
