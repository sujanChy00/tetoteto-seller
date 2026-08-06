import { useFieldContext } from "@/utils/form-hook-context";
import Visibility from "@expo/material-symbols/visibility.xml";
import VisibilityOff from "@expo/material-symbols/visibility_off.xml";
import {
  Column,
  Host,
  Icon,
  OutlinedTextField,
  Text,
  TextButton,
  useNativeState,
} from "@expo/ui/jetpack-compose";
import {
  fillMaxWidth,
  ModifierConfig,
  padding,
} from "@expo/ui/jetpack-compose/modifiers";

import { useCallback, useState } from "react";
import { scheduleOnRN } from "react-native-worklets";

interface Props {
  label: string;
  placeholder?: string;
  supportingText?: string;
  disabled?: boolean;
  columnsModifiers?: ModifierConfig[];
  inputModifiers?: ModifierConfig[];
}

export const PasswordField = ({
  label,
  placeholder,
  disabled,
  supportingText,
  columnsModifiers,
  inputModifiers,
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
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

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
          value={nativeValue}
          onValueChange={handleValueChange}
          modifiers={[fillMaxWidth(), ...(inputModifiers ?? [])]}
          isError={isInvalid}
          enabled={!disabled}
          visualTransformation={isPasswordVisible ? "none" : "password"}
        >
          <OutlinedTextField.Label>
            <Text>{label}</Text>
          </OutlinedTextField.Label>
          {placeholder && (
            <OutlinedTextField.Placeholder>
              <Text>{placeholder}</Text>
            </OutlinedTextField.Placeholder>
          )}
          <OutlinedTextField.TrailingIcon>
            <TextButton onClick={togglePasswordVisibility}>
              <Icon
                source={isPasswordVisible ? Visibility : VisibilityOff}
                contentDescription="toggle password visiblity"
              />
            </TextButton>
          </OutlinedTextField.TrailingIcon>
          {supportingText && (
            <OutlinedTextField.SupportingText>
              <Text>{supportingText}</Text>
            </OutlinedTextField.SupportingText>
          )}
        </OutlinedTextField>
      </Column>
    </Host>
  );
};
