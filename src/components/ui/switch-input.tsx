import { useHaptics } from "@/hooks/use-haptics";
import { Switch, View } from "react-native";
import { twMerge } from "tailwind-merge";
import { ThemedText } from "./themed-text";

export interface SwitchInputProps extends React.ComponentProps<typeof Switch> {
  className?: string;
  labelClassName?: string;
  label?: string;
}

export const SwitchInput = ({
  onValueChange,
  label,
  className,
  labelClassName,
  ...rest
}: SwitchInputProps) => {
  const haptics = useHaptics();
  return (
    <View
      className={twMerge("flex-row items-center justify-between", className)}
    >
      {label && <ThemedText className={labelClassName}>{label}</ThemedText>}
      <Switch
        {...rest}
        trackColorOffClassName="accent-muted"
        trackColorOnClassName="accent-primary-soft"
        onValueChange={(checked) => {
          haptics(checked ? "toggle-on" : "toggle-off");
          onValueChange?.(checked);
        }}
      />
    </View>
  );
};
