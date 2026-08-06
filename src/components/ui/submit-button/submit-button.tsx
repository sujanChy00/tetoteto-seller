import { useFormContext } from "@/utils/form-hook-context";
import {
  Button,
  CircularWavyProgressIndicator,
  Column,
  Text,
  useMaterialColors,
} from "@expo/ui/jetpack-compose";
import {
  fillMaxWidth,
  height,
  ModifierConfig,
  padding,
  width,
} from "@expo/ui/jetpack-compose/modifiers";

interface Props {
  buttonText: string;
  columnsModifiers?: ModifierConfig[];
  buttonModifiers?: ModifierConfig[];
  disabled?: boolean;
}

export const SubmitButton = ({
  buttonText,
  columnsModifiers,
  buttonModifiers,
  disabled,
}: Props) => {
  const form = useFormContext();
  const colors = useMaterialColors();

  return (
    <form.Subscribe
      selector={(state) => [state.isSubmitting, state.isFieldsValidating]}
    >
      {([isSubmitting, isValidating]) => (
        <Column
          modifiers={[
            fillMaxWidth(),
            padding(16, 0, 16, 0),
            ...(columnsModifiers ?? []),
          ]}
        >
          <Button
            enabled={!isSubmitting && !isValidating && !disabled}
            modifiers={[fillMaxWidth(), height(48), ...(buttonModifiers ?? [])]}
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
  );
};
