import { useFieldContext } from "@/utils/form-hook-context";
import { Field, FieldDescription } from "../ui/field";
import { SwitchInput, SwitchInputProps } from "../ui/switch-input";

interface Props extends Omit<SwitchInputProps, "onValueChange" | "value"> {
  description?: string;
  inputClassName?: string;
}

export const SwitchField = ({
  inputClassName,
  className,
  description,
  ...props
}: Props) => {
  const field = useFieldContext<boolean | undefined>();

  return (
    <Field className={className}>
      <SwitchInput
        {...props}
        className={inputClassName}
        onValueChange={field.handleChange}
        value={field.state.value ?? false}
      />
      {!!description && <FieldDescription>{description}</FieldDescription>}
    </Field>
  );
};
