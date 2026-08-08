import { useIOSModifiers } from "@/hooks/use-ios-modifiers";
import { TextFieldProps } from "@/types/components";
import { useFieldContext } from "@/utils/form-hook-context";
import {
  Host,
  TextField as SwiftTextField,
  VStack,
  useNativeState,
} from "@expo/ui/swift-ui";
import {
  autocorrectionDisabled,
  disabled as disabledModifier,
  padding,
  keyboardType as swiftKeyboardTypeModifier,
  textInputAutocapitalization,
} from "@expo/ui/swift-ui/modifiers";
import { useCallback, useMemo } from "react";
import { scheduleOnRN } from "react-native-worklets";

export const TextField = ({
  placeholder,
  disabled,
  autoFocus = false,
  keyboardType,
  paddingHorizontal = 0,
  paddingVertical = 0,
  useFullWidth = false,
}: TextFieldProps) => {
  const field = useFieldContext<string | undefined>();
  const nativeValue = useNativeState(field.state.value ?? "");
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
  const fieldError = field.state.meta.errors?.[0];
  const { fullWidthModifier, invalidBorderModifiers } = useIOSModifiers({
    useFullWidth,
    isInvalid,
  });

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
    <Host matchContents useViewportSizeMeasurement={useFullWidth}>
      <VStack
        modifiers={[
          padding({
            horizontal: paddingHorizontal,
            vertical: paddingVertical,
          }),
          ...fullWidthModifier,
        ]}
      >
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
            ...fullWidthModifier,
            disabledModifier(!!disabled),
          ]}
        />
      </VStack>
    </Host>
  );
};
