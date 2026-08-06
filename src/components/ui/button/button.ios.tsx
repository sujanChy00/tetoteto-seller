import { UIButtonProps } from "@/types/components";
import { Button as UIButton } from "@expo/ui/swift-ui";
import { ModifierConfig } from "@expo/ui/swift-ui/modifiers";

export const Button = ({
  label,
  systemImage,
  modifiers,
  role,
  onPress,
}: UIButtonProps & { modifiers?: ModifierConfig[] }) => {
  return (
    <UIButton
      systemImage={systemImage}
      label={label}
      modifiers={modifiers}
      role={role}
      onPress={onPress}
    />
  );
};
