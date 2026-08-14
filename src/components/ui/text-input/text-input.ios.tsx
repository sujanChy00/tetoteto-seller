import { TextFieldProps } from "@/types/components";
import { TextField as SwiftTextField, useNativeState } from "@expo/ui/swift-ui";
import {
  autocorrectionDisabled,
  border,
  disabled as disabledModifier,
  fixedSize,
  lineLimit,
  submitLabel,
  keyboardType as swiftKeyboardTypeModifier,
  onSubmit as swiftOnSubmitModifier,
  textInputAutocapitalization,
} from "@expo/ui/swift-ui/modifiers";
import { useCallback, useMemo } from "react";
import { scheduleOnRN } from "react-native-worklets";
import { useCSSVariable } from "uniwind";

export const TextInput = ({
  isInvalid,
  maxLines = 5,
  multiLine,
  keyboardType,
  onSubmit,
  placeholder,
  disabled,
  autoFocus,
  value,
  onValueChange,
}: TextFieldProps) => {
  const nativeValue = useNativeState(value ?? "");
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

  const submitModifiers = useMemo(() => {
    if (onSubmit) return [submitLabel("done"), swiftOnSubmitModifier(onSubmit)];
    return [];
  }, [onSubmit]);

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
        ...submitModifiers,
      ]}
    />
  );
};
