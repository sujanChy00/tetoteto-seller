import { TextFieldKeyboardType } from "@/types/components";
import { useFieldContext } from "@/utils/form-hook-context";
import { Column } from "@expo/ui";
import {
  Host,
  TextField as SwiftTextField,
  useNativeState,
} from "@expo/ui/swift-ui";
import {
  border,
  disabled as disabledModifier,
  frame,
  ModifierConfig,
  padding,
  keyboardType as swiftKeyboardTypeModifier,
} from "@expo/ui/swift-ui/modifiers";
import { useCallback, useMemo } from "react";
import { scheduleOnRN } from "react-native-worklets";
import { useCSSVariable } from "uniwind";

interface Props {
  placeholder?: string;
  disabled?: boolean;
  columnsModifiers?: ModifierConfig[];
  inputModifiers?: ModifierConfig[];
  keyboardType?: TextFieldKeyboardType;
}

export const TextField = ({
  placeholder,
  disabled,
  columnsModifiers,
  inputModifiers,
  keyboardType,
}: Props) => {
  const colorDanger = useCSSVariable("--color-danger");
  const field = useFieldContext<string | undefined>();
  const nativeValue = useNativeState(field.state.value ?? "");
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

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

  const invalidModifiers = isInvalid
    ? [border({ color: colorDanger as string, width: 1 })]
    : [];

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
    <Host matchContents useViewportSizeMeasurement>
      <Column
        modifiers={[
          frame({
            maxWidth: Infinity,
          }),
          padding({
            horizontal: 16,
          }),
          ...(columnsModifiers ?? []),
        ]}
      >
        <SwiftTextField
          placeholder={placeholder}
          text={nativeValue}
          onTextChange={handleValueChange}
          modifiers={[
            ...invalidModifiers,
            ...keyboardTypeModifiers,
            disabledModifier(!!disabled),
            ...(inputModifiers ?? []),
          ]}
        />
      </Column>
    </Host>
  );
};
