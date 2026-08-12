import { TextFieldProps } from "@/types/components";
import { useFieldContext } from "@/utils/form-hook-context";
import {
  Text,
  TextField as UITextField,
  useNativeState,
} from "@expo/ui/jetpack-compose";
import { weight } from "@expo/ui/jetpack-compose/modifiers";
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
  maxLines = 5,
  multiLine,
  onSubmit,
}: TextFieldProps) => {
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
      {fieldError ? (
        <UITextField.SupportingText>
          <Text>{fieldError?.message}</Text>
        </UITextField.SupportingText>
      ) : null}
    </UITextField>
  );
};
