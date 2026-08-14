import { TextFieldProps } from "@/types/components";
import {
  Text,
  TextField as UITextField,
  useNativeState,
} from "@expo/ui/jetpack-compose";
import { weight } from "@expo/ui/jetpack-compose/modifiers";
import { useCallback } from "react";
import { scheduleOnRN } from "react-native-worklets";

export const TextInput = ({
  autoFocus,
  disabled,
  keyboardType,
  label,
  leadingIcon,
  // placeholder,
  prefix,
  suffix,
  trailingIcon,
  maxLines,
  multiLine,
  errorMessage,
  isInvalid,
  onSubmit,
  onValueChange,
  value,
}: TextFieldProps) => {
  const nativeValue = useNativeState(value ?? "");
  const updateField = useCallback(
    (value: string) => {
      onValueChange?.(value);
    },
    [onValueChange],
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
    <UITextField
      singleLine={!multiLine}
      maxLines={maxLines}
      autoFocus={autoFocus}
      isError={isInvalid}
      enabled={!disabled}
      modifiers={[weight(1)]}
      value={nativeValue}
      onValueChange={handleValueChange}
      keyboardActions={onSubmit ? { onDone: onSubmit } : undefined}
      keyboardOptions={{
        keyboardType,
        capitalization: "none",
        autoCorrectEnabled: false,
        imeAction: onSubmit ? "done" : "default",
      }}
    >
      <UITextField.Label>
        <Text>{label}</Text>
      </UITextField.Label>
      {/*{placeholder ? (
        <UITextField.Placeholder>
          <Text>{placeholder}</Text>
        </UITextField.Placeholder>
      ) : null}*/}
      {leadingIcon ? (
        <UITextField.LeadingIcon>
          <Text>{leadingIcon}</Text>
        </UITextField.LeadingIcon>
      ) : null}
      {trailingIcon ? (
        <UITextField.TrailingIcon>
          <Text>{trailingIcon}</Text>
        </UITextField.TrailingIcon>
      ) : null}
      {prefix ? (
        <UITextField.Prefix>
          <Text>{prefix}</Text>
        </UITextField.Prefix>
      ) : null}
      {suffix ? (
        <UITextField.Suffix>
          <Text>{suffix}</Text>
        </UITextField.Suffix>
      ) : null}
      {!!errorMessage ? (
        <UITextField.SupportingText>
          <Text>{errorMessage}</Text>
        </UITextField.SupportingText>
      ) : null}
    </UITextField>
  );
};
