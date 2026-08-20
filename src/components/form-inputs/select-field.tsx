import { FormInputBaseProps } from "@/types/components";
import { useFieldContext } from "@/utils/form-hook-context";
import { Field, FieldDescription, FieldError, FieldLabel } from "../ui/field";
import { SelectInput } from "../ui/select-input";

interface SelectFieldProps {
  options: { label: string; value: string }[];
  isDisabled?: boolean;
  className?: string;
}

export const SelectField = ({
  options,
  label,
  isDisabled,
  className,
  description,
}: FormInputBaseProps<SelectFieldProps>) => {
  const field = useFieldContext<string | undefined>();
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
  const fieldError = field.state.meta.errors?.[0];

  return (
    <Field className={className}>
      {!!label && (
        <FieldLabel isDisabled={isDisabled} isInvalid={isInvalid}>
          {label}
        </FieldLabel>
      )}
      <SelectInput
        disabled={!isDisabled}
        onValueChange={(v) => {
          field.handleChange(v.toString());
        }}
        value={field.state.value ?? ""}
        options={options}
      />
      {!!description && <FieldDescription>{description}</FieldDescription>}
      {!!fieldError?.message && <FieldError>{fieldError?.message}</FieldError>}
    </Field>
  );
};
