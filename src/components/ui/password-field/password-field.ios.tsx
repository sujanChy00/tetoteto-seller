import { PasswordFieldProps } from "@/types/components";
import { useFieldContext } from "@/utils/form-hook-context";
import { SecureField, useNativeState } from "@expo/ui/swift-ui";
import {
  autocorrectionDisabled,
  border,
  disabled as disabledModifier,
  textInputAutocapitalization,
} from "@expo/ui/swift-ui/modifiers";
import { useCallback, useMemo } from "react";
import { scheduleOnRN } from "react-native-worklets";
import { useCSSVariable } from "uniwind";

export const PasswordField = ({
  placeholder,
  disabled,
  autoFocus = false,
}: PasswordFieldProps) => {
  const colorDanger = useCSSVariable("--color-danger");
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

  const invalidBorderModifiers = useMemo(
    () =>
      isInvalid ? [border({ color: colorDanger as string, width: 1 })] : [],
    [isInvalid],
  );
  return (
    <SecureField
      placeholder={placeholder}
      text={nativeValue}
      onTextChange={handleValueChange}
      autoFocus={autoFocus}
      modifiers={[
        autocorrectionDisabled(),
        textInputAutocapitalization("never"),
        ...invalidBorderModifiers,
        disabledModifier(!!disabled),
      ]}
    />
  );
};
