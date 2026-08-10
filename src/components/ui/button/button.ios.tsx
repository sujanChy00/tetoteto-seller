import { UIButtonProps } from "@/types/components";
import { Button as UIButton } from "@expo/ui/swift-ui";
import {
  buttonStyle,
  controlSize,
  labelStyle,
  disabled as swiftUIDisabledModifier,
} from "@expo/ui/swift-ui/modifiers";
import { useMemo } from "react";

export const Button = ({
  systemImageIos,
  roleIos,
  iconOnlyIos,
  onPress,
  variant,
  size = "regular",
  disabled,
  children,
}: UIButtonProps) => {
  const disabledModifiers = useMemo(
    () => (disabled ? [swiftUIDisabledModifier()] : []),
    [disabled],
  );

  const buttonType = useMemo(() => {
    switch (variant) {
      case "outlined":
        return [buttonStyle("bordered")];
      case "filled":
        return [buttonStyle("borderedProminent")];
      case "text":
        return [buttonStyle("plain")];
      case "elevated":
        return [buttonStyle("glass")];
      default:
        return [];
    }
  }, [variant]);

  const isIconOnly = useMemo(
    () => (iconOnlyIos ? [labelStyle("iconOnly")] : []),
    [iconOnlyIos],
  );

  return (
    <UIButton
      systemImage={systemImageIos}
      role={roleIos}
      onPress={onPress}
      modifiers={[
        ...disabledModifiers,
        ...buttonType,
        controlSize(size),
        ...isIconOnly,
      ]}
    >
      {children}
    </UIButton>
  );
};
