import { Button, ButtonProps } from "@expo/ui/swift-ui";
import { buttonStyle, controlSize } from "@expo/ui/swift-ui/modifiers";
import { SFSymbol } from "expo-symbols";
import { Host } from "./host";

interface Props {
  label?: string;
  isIconOnly?: boolean;
  systemImage?: SFSymbol;
  variant?: "glassProminent" | "glass";
  size?: "small" | "mini" | "regular" | "large" | "extraLarge";
  role?: ButtonProps["role"];
  onPress?: () => void;
}

export const IOSGlassButton = ({
  label,
  isIconOnly,
  systemImage,
  variant = "glass",
  size = "regular",
  role,
  onPress,
}: Props) => {
  return (
    <Host matchContents>
      <Button
        label={label}
        systemImage={systemImage}
        modifiers={[buttonStyle(variant), controlSize(size)]}
        role={role}
        onPress={onPress}
      />
    </Host>
  );
};
