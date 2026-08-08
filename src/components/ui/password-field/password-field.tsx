import { useAndroidModifiers } from "@/hooks/use-android-modifiers";
import { PasswordFieldProps } from "@/types/components";
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
import { fillMaxWidth, padding } from "@expo/ui/jetpack-compose/modifiers";

import { useCallback, useState } from "react";
import { scheduleOnRN } from "react-native-worklets";

export const PasswordField = ({
  label,
  placeholder,
  disabled,
  paddingHorizontal = 0,
  useFullWidth = false,
  paddingVertical = 0,
}: PasswordFieldProps) => {
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
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

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
          value={nativeValue}
          onValueChange={handleValueChange}
          modifiers={useFullWidth ? [fillMaxWidth()] : []}
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
          {fieldError && (
            <OutlinedTextField.SupportingText>
              <Text>{fieldError?.message}</Text>
            </OutlinedTextField.SupportingText>
          )}
        </OutlinedTextField>
      </Column>
    </Host>
  );
};
