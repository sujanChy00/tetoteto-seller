import { FormInputBaseProps } from "@/types/components";
import { useFieldContext } from "@/utils/form-hook-context";
import { Field, FieldDescription, FieldError, FieldLabel } from "../ui/field";
import { SelectInput } from "../ui/select-input";

interface SelectFieldProps {
  options: { label: string; value: string }[];
  className?: string;
  onValueChange?: (value: string) => void;
  snapPoints?: string[];
}

export const SelectField = ({
  options,
  label,
  className,
  description,
  onValueChange,
  inputClassName,
  isDisabled,
  snapPoints,
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
        className={inputClassName}
        disabled={isDisabled}
        snapPoints={snapPoints}
        onValueChange={(v) => {
          field.handleChange(v.toString());
          onValueChange?.(v.toString());
        }}
        value={field.state.value ?? ""}
        options={options}
      />
      {!!description && <FieldDescription>{description}</FieldDescription>}
      {!!fieldError && (
        <FieldError>{fieldError ?? fieldError?.message}</FieldError>
      )}
    </Field>
  );
};
