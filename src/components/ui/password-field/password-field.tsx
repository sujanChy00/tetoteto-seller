import { PasswordFieldProps } from "@/types/components";
import { useFieldContext } from "@/utils/form-hook-context";
import Visibility from "@expo/material-symbols/visibility.xml";
import VisibilityOff from "@expo/material-symbols/visibility_off.xml";
import {
  Icon,
  Text,
  TextButton,
  TextField as UITextField,
  useNativeState,
} from "@expo/ui/jetpack-compose";
import { weight } from "@expo/ui/jetpack-compose/modifiers";

import { useCallback, useState } from "react";
import { scheduleOnRN } from "react-native-worklets";
import { Host } from "../host";

export const PasswordField = ({
  label,
  disabled,
  onSubmit,
  hostProps,
  fillFullWidth = true,
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
    <Host
      matchContents={hostProps?.matchContents ?? { vertical: true }}
      style={{ width: "100%", ...hostProps?.style }}
    >
      <UITextField
        value={nativeValue}
        onValueChange={handleValueChange}
        isError={isInvalid}
        enabled={!disabled}
        modifiers={fillFullWidth ? [weight(1)] : undefined}
        visualTransformation={isPasswordVisible ? "none" : "password"}
        keyboardActions={onSubmit ? { onDone: onSubmit } : undefined}
        keyboardOptions={onSubmit ? { imeAction: "done" } : undefined}
      >
        <UITextField.Label>
          <Text>{label}</Text>
        </UITextField.Label>
        {/*{placeholder && (
        <UITextField.Placeholder>
          <Text>{placeholder}</Text>
        </UITextField.Placeholder>
      )}*/}
        <UITextField.TrailingIcon>
          <TextButton onClick={togglePasswordVisibility}>
            <Icon
              source={isPasswordVisible ? Visibility : VisibilityOff}
              contentDescription="toggle password visiblity"
            />
          </TextButton>
        </UITextField.TrailingIcon>
        {fieldError && (
          <UITextField.SupportingText>
            <Text>{fieldError?.message}</Text>
          </UITextField.SupportingText>
        )}
      </UITextField>
    </Host>
  );
};
