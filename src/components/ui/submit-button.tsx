import { useFormContext } from "@/utils/form-hook-context";
import { PressableProps } from "react-native";
import { Button } from "./button";

export const SubmitButton = ({ disabled, ...rest }: PressableProps) => {
  const form = useFormContext();

  return (
    <form.Subscribe
      selector={(state) => [state.isSubmitting, state.isFieldsValidating]}
    >
      {([isSubmitting, isValidating]) => (
        <Button.Primary
          disabled={isSubmitting || isValidating || disabled}
          onPress={() => {
            form.handleSubmit();
          }}
          {...rest}
        />
      )}
    </form.Subscribe>
  );
};
