import { TextFieldProps } from "@/types/components";
import { useFieldContext } from "@/utils/form-hook-context";
import { TextField as SwiftTextField, useNativeState } from "@expo/ui/swift-ui";
import {
  autocorrectionDisabled,
  border,
  disabled as disabledModifier,
  fixedSize,
  lineLimit,
  keyboardType as swiftKeyboardTypeModifier,
  textInputAutocapitalization,
} from "@expo/ui/swift-ui/modifiers";
import { useCallback, useMemo } from "react";
import { scheduleOnRN } from "react-native-worklets";
import { useCSSVariable } from "uniwind";

export const TextField = ({
  placeholder,
  disabled,
  autoFocus = false,
  keyboardType,
  multiLine,
  maxLines = 5,
}: TextFieldProps) => {
  const field = useFieldContext<string | undefined>();
  const nativeValue = useNativeState(field.state.value ?? "");
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
  const fieldError = field.state.meta.errors?.[0];
  const colorDanger = useCSSVariable("--color-danger");

  const invalidBorderModifiers = useMemo(
    () =>
      isInvalid ? [border({ color: colorDanger as string, width: 1 })] : [],
    [isInvalid],
  );
  const multiLineModifiers = useMemo(
    () =>
      multiLine
        ? [
            lineLimit(maxLines),
            fixedSize({ horizontal: false, vertical: true }),
          ]
        : [],
    [maxLines, multiLine],
  );

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

  const keyboardTypeModifiers = useMemo(() => {
    if (keyboardType === "email")
      return [swiftKeyboardTypeModifier("email-address")];
    if (keyboardType === "number" || keyboardType === "numberPassword")
      return [swiftKeyboardTypeModifier("numeric")];
    if (keyboardType === "decimal")
      return [swiftKeyboardTypeModifier("decimal-pad")];
    if (keyboardType === "phone")
      return [swiftKeyboardTypeModifier("phone-pad")];
    if (keyboardType === "text") return [swiftKeyboardTypeModifier("default")];
    if (keyboardType === "uri") return [swiftKeyboardTypeModifier("url")];
    if (keyboardType === "ascii")
      return [swiftKeyboardTypeModifier("ascii-capable")];

    return [];
  }, [keyboardType]);

  return (
    <SwiftTextField
      placeholder={placeholder}
      text={nativeValue}
      onTextChange={handleValueChange}
      autoFocus={autoFocus}
      modifiers={[
        autocorrectionDisabled(),
        textInputAutocapitalization("never"),
        ...invalidBorderModifiers,
        ...keyboardTypeModifiers,
        ...multiLineModifiers,
        disabledModifier(!!disabled),
      ]}
    />
  );
};
