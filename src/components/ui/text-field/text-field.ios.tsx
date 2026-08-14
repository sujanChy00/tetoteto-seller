import { TextFieldProps } from "@/types/components";
import { useFieldContext } from "@/utils/form-hook-context";
import { TextInput } from "../text-input";

export const TextField = (props: TextFieldProps) => {
  const field = useFieldContext<string | undefined>();
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
  const fieldError = field.state.meta.errors?.[0];

  return (
    <TextInput
      {...props}
      isInvalid={isInvalid}
      errorMessage={fieldError?.message}
      value={field.state.value}
      onValueChange={field.handleChange}
    />
  );
};
