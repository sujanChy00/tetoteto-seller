import { useIOSModifiers } from "@/hooks/use-ios-modifiers";
import { PasswordFieldProps } from "@/types/components";
import { useFieldContext } from "@/utils/form-hook-context";
import { Host, SecureField, VStack, useNativeState } from "@expo/ui/swift-ui";
import {
  autocorrectionDisabled,
  disabled as disabledModifier,
  padding,
  textInputAutocapitalization,
} from "@expo/ui/swift-ui/modifiers";
import { useCallback } from "react";
import { scheduleOnRN } from "react-native-worklets";

export const PasswordField = ({
  placeholder,
  disabled,
  paddingHorizontal = 0,
  paddingVertical = 0,
  useFullWidth = false,
  autoFocus = false,
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

  const { fullWidthModifier, invalidBorderModifiers } = useIOSModifiers({
    useFullWidth,
    isInvalid,
  });

  return (
    <Host matchContents useViewportSizeMeasurement={useFullWidth}>
      <VStack
        modifiers={[
          ...fullWidthModifier,
          padding({
            horizontal: paddingHorizontal,
            vertical: paddingVertical,
          }),
        ]}
      >
        <SecureField
          placeholder={placeholder}
          text={nativeValue}
          onTextChange={handleValueChange}
          autoFocus={autoFocus}
          modifiers={[
            autocorrectionDisabled(),
            textInputAutocapitalization("never"),
            ...invalidBorderModifiers,
            ...fullWidthModifier,
            disabledModifier(!!disabled),
          ]}
        />
      </VStack>
    </Host>
  );
};
