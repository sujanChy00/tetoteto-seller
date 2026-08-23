import { useHaptics } from "@/hooks/use-haptics";
import { Switch } from "@expo/ui";
import { View } from "react-native";
import { twMerge } from "tailwind-merge";
import { Host } from "./host";
import { ThemedText } from "./themed-text";

export interface SwitchInputProps extends React.ComponentProps<typeof Switch> {
  className?: string;
  labelClassName?: string;
  hostProps?: React.ComponentProps<typeof Host>;
}

export const SwitchInput = ({
  onValueChange,
  label,
  className,
  labelClassName,
  hostProps,
  ...rest
}: SwitchInputProps) => {
  const haptics = useHaptics();
  return (
    <View
      className={twMerge("flex-row items-center justify-between", className)}
    >
      {label && <ThemedText className={labelClassName}>{label}</ThemedText>}
      <Host matchContents {...hostProps}>
        <Switch
          {...rest}
          onValueChange={(checked) => {
            haptics(checked ? "toggle-on" : "toggle-off");
            onValueChange(checked);
          }}
        />
      </Host>
    </View>
  );
};
