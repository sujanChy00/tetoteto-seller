import { useFieldContext } from "@/utils/form-hook-context";
import { Field, FieldLabel } from "../ui/field";
import { TextInput, TextInputProps } from "../ui/text-input";

interface Props extends TextInputProps {
  label?: string;
  isDisabled?: boolean;
}

export const TextField = ({
  label,
  isDisabled = false,
  ...inputProps
}: Props) => {
  const field = useFieldContext<string | undefined>();
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
  const fieldError = field.state.meta.errors?.[0];

  return (
    <Field>
      <FieldLabel>{label}</FieldLabel>
      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        {...inputProps}
        isInvalid={isInvalid}
        editable={!isDisabled}
        onBlur={field.handleBlur}
        value={field.state.value}
        onChangeText={field.handleChange}
      />
    </Field>
  );
};
