import { TextFieldKeyboardType } from "@/types/components";
import { useFieldContext } from "@/utils/form-hook-context";
import {
  Column,
  Host,
  OutlinedTextField,
  Text,
  useNativeState,
} from "@expo/ui/jetpack-compose";
import {
  fillMaxWidth,
  ModifierConfig,
  padding,
} from "@expo/ui/jetpack-compose/modifiers";
import { useCallback } from "react";
import { scheduleOnRN } from "react-native-worklets";

interface Props {
  label: string;
  placeholder?: string;
  prefix?: string;
  suffix?: string;
  leadingIcon?: string;
  trailingIcon?: string;
  supportingText?: string;
  disabled?: boolean;
  columnsModifiers?: ModifierConfig[];
  inputModifiers?: ModifierConfig[];
  keyboardType?: TextFieldKeyboardType;
}

export const TextField = ({
  label,
  placeholder,
  disabled,
  leadingIcon,
  trailingIcon,
  supportingText,
  prefix,
  suffix,
  columnsModifiers,
  inputModifiers,
  keyboardType,
}: Props) => {
  const field = useFieldContext<string | undefined>();
  const nativeValue = useNativeState(field.state.value ?? "");
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  const updateField = useCallback(
    (value: string) => {
      field.handleChange(value);
    },
    [field.handleChange],
  );

  const handleValueChange = useCallback(
    (value: string) => {
      "worklet";

      nativeValue.value = value;
      scheduleOnRN(updateField, value);
    },
    [nativeValue, updateField],
  );
  return (
    <Host matchContents useViewportSizeMeasurement>
      <Column
        modifiers={[
          fillMaxWidth(),
          padding(16, 0, 16, 0),
          ...(columnsModifiers ?? []),
        ]}
      >
        <OutlinedTextField
          modifiers={[fillMaxWidth(), ...(inputModifiers ?? [])]}
          isError={isInvalid}
          enabled={!disabled}
          value={nativeValue}
          onValueChange={handleValueChange}
          keyboardOptions={{
            keyboardType,
          }}
        >
          <OutlinedTextField.Label>
            <Text>{label}</Text>
          </OutlinedTextField.Label>
          {placeholder ? (
            <OutlinedTextField.Placeholder>
              <Text>{placeholder}</Text>
            </OutlinedTextField.Placeholder>
          ) : null}
          {leadingIcon ? (
            <OutlinedTextField.LeadingIcon>
              <Text>{leadingIcon}</Text>
            </OutlinedTextField.LeadingIcon>
          ) : null}
          {trailingIcon ? (
            <OutlinedTextField.TrailingIcon>
              <Text>{trailingIcon}</Text>
            </OutlinedTextField.TrailingIcon>
          ) : null}
          {prefix ? (
            <OutlinedTextField.Prefix>
              <Text>{prefix}</Text>
            </OutlinedTextField.Prefix>
          ) : null}
          {suffix ? (
            <OutlinedTextField.Suffix>
              <Text>{suffix}</Text>
            </OutlinedTextField.Suffix>
          ) : null}
          {supportingText ? (
            <OutlinedTextField.SupportingText>
              <Text>{supportingText}</Text>
            </OutlinedTextField.SupportingText>
          ) : null}
        </OutlinedTextField>
      </Column>
    </Host>
  );
};
