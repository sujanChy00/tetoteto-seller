import { useHaptics } from "@/hooks/use-haptics";
import { Switch } from "@expo/ui";
import { Host } from "./host";

export interface SwitchInputProps extends React.ComponentProps<typeof Switch> {
  hostProps?: React.ComponentProps<typeof Host>;
}

export const SwitchInput = ({
  onValueChange,
  hostProps,
  ...rest
}: SwitchInputProps) => {
  const haptics = useHaptics();
  return (
    <Host
      {...hostProps}
      matchContents={hostProps?.matchContents ?? { vertical: true }}
    >
      <Switch
        {...rest}
        onValueChange={(checked) => {
          haptics(checked ? "toggle-on" : "toggle-off");
          onValueChange(checked);
        }}
      />
    </Host>
  );
};
