import { Host } from "@/components/ui/host";
import { useFormContext } from "@/utils/form-hook-context";
import { Button } from "@expo/ui/jetpack-compose";
import {
  animateContentSize,
  height,
  weight,
} from "@expo/ui/jetpack-compose/modifiers";

interface Props {
  disabled?: boolean;
  height?: number;
  children?: React.ReactElement;
}

export const SubmitButton = ({
  disabled,
  height: buttonHeight = 48,
  children,
}: Props) => {
  const form = useFormContext();

  return (
    <form.Subscribe
      selector={(state) => [state.isSubmitting, state.isFieldsValidating]}
    >
      {([isSubmitting, isValidating]) => (
        <Host matchContents={{ vertical: true }} style={{ width: "100%" }}>
          <Button
            enabled={!isSubmitting && !isValidating && !disabled}
            modifiers={[weight(1), height(buttonHeight), animateContentSize()]}
            onClick={() => {
              form.handleSubmit();
            }}
          >
            {children}
          </Button>
        </Host>
      )}
    </form.Subscribe>
  );
};
