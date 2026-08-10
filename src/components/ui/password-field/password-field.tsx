import { PasswordFieldProps } from "@/types/components";
import { useFieldContext } from "@/utils/form-hook-context";
import Visibility from "@expo/material-symbols/visibility.xml";
import VisibilityOff from "@expo/material-symbols/visibility_off.xml";
import {
  Icon,
  OutlinedTextField,
  Text,
  TextButton,
  useNativeState,
} from "@expo/ui/jetpack-compose";
import { weight } from "@expo/ui/jetpack-compose/modifiers";

import { useCallback, useState } from "react";
import { scheduleOnRN } from "react-native-worklets";

export const PasswordField = ({
  label,
  placeholder,
  disabled,
}: PasswordFieldProps) => {
  const field = useFieldContext<string | undefined>();
  const nativeValue = useNativeState(field.state.value ?? "");
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
  const fieldError = field.state.meta.errors?.[0];

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
    <OutlinedTextField
      value={nativeValue}
      onValueChange={handleValueChange}
      isError={isInvalid}
      enabled={!disabled}
      modifiers={[weight(1)]}
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
  );
};
