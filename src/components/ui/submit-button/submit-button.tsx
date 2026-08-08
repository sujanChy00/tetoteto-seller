import { useAndroidModifiers } from "@/hooks/use-android-modifiers";
import { useFormContext } from "@/utils/form-hook-context";
import {
  Button,
  CircularWavyProgressIndicator,
  Column,
  Host,
  Text,
  useMaterialColors,
} from "@expo/ui/jetpack-compose";
import { height, padding, width } from "@expo/ui/jetpack-compose/modifiers";

interface Props {
  buttonText: string;
  disabled?: boolean;
  paddingHorizontal?: number;
  useFullWidth?: boolean;
  paddingVertical?: number;
  height?: number;
}

export const SubmitButton = ({
  buttonText,
  disabled,
  paddingHorizontal = 0,
  useFullWidth = false,
  height: buttonHeight = 48,
  paddingVertical = 0,
}: Props) => {
  const form = useFormContext();
  const colors = useMaterialColors();
  const { fullWidthModifier } = useAndroidModifiers({ useFullWidth });

  return (
    <Host matchContents useViewportSizeMeasurement={useFullWidth}>
      <form.Subscribe
        selector={(state) => [state.isSubmitting, state.isFieldsValidating]}
      >
        {([isSubmitting, isValidating]) => (
          <Column
            modifiers={[
              ...fullWidthModifier,
              padding(
                paddingHorizontal,
                paddingVertical,
                paddingHorizontal,
                paddingVertical,
              ),
            ]}
          >
            <Button
              enabled={!isSubmitting && !isValidating && !disabled}
              modifiers={[...fullWidthModifier, height(buttonHeight)]}
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
          </Column>
        )}
      </form.Subscribe>
    </Host>
  );
};
