import { Host } from "@/components/ui/host";
import { useFormContext } from "@/utils/form-hook-context";
import {
  Button,
  CircularWavyProgressIndicator,
  Text,
  useMaterialColors,
} from "@expo/ui/jetpack-compose";
import { height, weight, width } from "@expo/ui/jetpack-compose/modifiers";

interface Props {
  buttonText: string;
  disabled?: boolean;
  height?: number;
}

export const SubmitButton = ({
  buttonText,
  disabled,
  height: buttonHeight = 48,
}: Props) => {
  const form = useFormContext();
  const colors = useMaterialColors();

  return (
    <form.Subscribe
      selector={(state) => [state.isSubmitting, state.isFieldsValidating]}
    >
      {([isSubmitting, isValidating]) => (
        <Host matchContents={{ vertical: true }} style={{ width: "100%" }}>
          <Button
            enabled={!isSubmitting && !isValidating && !disabled}
            modifiers={[weight(1), height(buttonHeight)]}
            onClick={() => {
              form.handleSubmit();
            }}
          >
            {isSubmitting ? (
              <CircularWavyProgressIndicator
                color={colors.surfaceBright}
                modifiers={[height(35), width(35)]}
              />
            ) : (
              <Text>{buttonText}</Text>
            )}
          </Button>
        </Host>
      )}
    </form.Subscribe>
  );
};
