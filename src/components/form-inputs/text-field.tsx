import { FormInputBaseProps } from "@/types/components";
import { useFieldContext } from "@/utils/form-hook-context";
import { Field, FieldDescription, FieldError, FieldLabel } from "../ui/field";
import { TextInput, TextInputProps } from "../ui/text-input";

export const TextField = ({
  label,
  isDisabled = false,
  description,
  inputClassName,
  className,
  ...inputProps
}: FormInputBaseProps<TextInputProps>) => {
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
      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        {...inputProps}
        className={inputClassName}
        isInvalid={isInvalid}
        editable={!isDisabled}
        onBlur={field.handleBlur}
        value={String(field.state.value ?? "")}
        onChangeText={field.handleChange}
      />
      {!!description && <FieldDescription>{description}</FieldDescription>}
      {!!fieldError && (
        <FieldError>{fieldError ?? fieldError?.message}</FieldError>
      )}
    </Field>
  );
};
