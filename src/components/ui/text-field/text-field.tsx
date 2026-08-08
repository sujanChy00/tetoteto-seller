import { useAndroidModifiers } from "@/hooks/use-android-modifiers";
import { TextFieldProps } from "@/types/components";
import { useFieldContext } from "@/utils/form-hook-context";
import {
  Column,
  Host,
  OutlinedTextField,
  Text,
  useNativeState,
} from "@expo/ui/jetpack-compose";
import { padding } from "@expo/ui/jetpack-compose/modifiers";
import { useCallback } from "react";
import { scheduleOnRN } from "react-native-worklets";

export const TextField = ({
  label,
  placeholder,
  disabled,
  leadingIcon,
  trailingIcon,
  prefix,
  suffix,
  keyboardType,
  autoFocus = false,
  paddingHorizontal = 0,
  useFullWidth = false,
  paddingVertical = 0,
}: TextFieldProps) => {
  const field = useFieldContext<string | undefined>();
  const nativeValue = useNativeState(field.state.value ?? "");
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
  const fieldError = field.state.meta.errors?.[0];
  const { fullWidthModifier } = useAndroidModifiers({ useFullWidth });

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
    <Host matchContents useViewportSizeMeasurement={useFullWidth}>
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
        <OutlinedTextField
          autoFocus={autoFocus}
          modifiers={fullWidthModifier}
          isError={isInvalid}
          enabled={!disabled}
          value={nativeValue}
          onValueChange={handleValueChange}
          keyboardOptions={{
            keyboardType,
            capitalization: "none",
            autoCorrectEnabled: false,
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
          {fieldError ? (
            <OutlinedTextField.SupportingText>
              <Text>{fieldError?.message}</Text>
            </OutlinedTextField.SupportingText>
          ) : null}
        </OutlinedTextField>
      </Column>
    </Host>
  );
};
