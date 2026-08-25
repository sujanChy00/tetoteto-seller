import { useFieldContext } from "@/utils/form-hook-context";
import { Field, FieldDescription, FieldError } from "../ui/field";
import { RadioInput } from "../ui/radio-input";

interface Props {
  options: { label: string; value: string; disabled?: boolean }[];
  className?: string;
  inputClassName?: string;
  description?: string;
}

export const RadioField = ({
  options,
  className,
  inputClassName,
  description,
}: Props) => {
  const field = useFieldContext<string | undefined>();
  const fieldError = field.state.meta.errors?.[0];

  return (
    <Field className={className}>
      {options.map((item) => (
        <RadioInput
          key={item.value}
          selected={item.value === field.state.value}
          onPress={() => {
            field.handleChange(item.value);
          }}
          label={item.label}
          className={inputClassName}
          disabled={item.disabled}
        />
      ))}
      {!!description && <FieldDescription>{description}</FieldDescription>}
      {!!fieldError && (
        <FieldError>{fieldError ?? fieldError?.message}</FieldError>
      )}
    </Field>
  );
};
