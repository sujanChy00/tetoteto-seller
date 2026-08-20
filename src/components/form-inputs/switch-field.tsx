import { useFieldContext } from "@/utils/form-hook-context";
import { SwitchInput, SwitchInputProps } from "../ui/switch-input";

export const SwitchField = (
  props: Omit<SwitchInputProps, "onValueChange" | "value">,
) => {
  const field = useFieldContext<boolean | undefined>();

  return (
    <SwitchInput
      {...props}
      onValueChange={field.handleChange}
      value={field.state.value ?? false}
    />
  );
};
