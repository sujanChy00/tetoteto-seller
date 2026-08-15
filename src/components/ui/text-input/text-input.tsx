import { TextFieldProps } from "@/types/components";
import {
  Text,
  TextField as UITextField,
  useNativeState,
} from "@expo/ui/jetpack-compose";
import { weight } from "@expo/ui/jetpack-compose/modifiers";
import { useCallback } from "react";
import { scheduleOnRN } from "react-native-worklets";
import { Host } from "../host";

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
  hostProps,
  fillFullWidth = true,
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
    <Host
      matchContents={hostProps?.matchContents ?? { vertical: true }}
      style={{ width: "100%", ...hostProps?.style }}
    >
      <UITextField
        singleLine={!multiLine}
        maxLines={maxLines}
        autoFocus={autoFocus}
        isError={isInvalid}
        enabled={!disabled}
        modifiers={fillFullWidth ? [weight(1)] : undefined}
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
    </Host>
  );
};
