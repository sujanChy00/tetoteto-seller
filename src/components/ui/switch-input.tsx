import { useHaptics } from "@/hooks/use-haptics";
import { Switch } from "@expo/ui";
import { Host } from "./host";

export const SwitchInput = ({
  onValueChange,
  ...rest
}: React.ComponentProps<typeof Switch>) => {
  const haptics = useHaptics();
  return (
    <Host matchContents>
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
