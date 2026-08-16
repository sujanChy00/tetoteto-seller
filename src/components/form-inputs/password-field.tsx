import { useFieldContext } from "@/utils/form-hook-context";
import { SymbolView } from "expo-symbols";
import { useState } from "react";
import { TextInputProps } from "react-native";
import { GhostButton } from "../ui/button";
import { InputGroup } from "../ui/input-group";

interface Props extends TextInputProps {
  label?: string;
  isDisabled?: boolean;
}

export const PasswordField = ({
  label,
  isDisabled = false,
  ...inputProps
}: Props) => {
  const [showPassword, setShowPassword] = useState(false);
  const field = useFieldContext<string | undefined>();
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
  const fieldError = field.state.meta.errors?.[0];

  return (
    <InputGroup className="pr-0" isInvalid={isInvalid} isDisabled={isDisabled}>
      <InputGroup.Prefix isDecorative>
        <SymbolView name={{ ios: "lock.fill", android: "lock" }} size={18} />
      </InputGroup.Prefix>
      <InputGroup.Input
        {...inputProps}
        editable={!isDisabled}
        onBlur={field.handleBlur}
        value={field.state.value}
        onChangeText={field.handleChange}
        secureTextEntry={!showPassword}
        accessibilityLabel="Secure Field"
        textContentType={inputProps.textContentType ?? "password"}
        autoComplete={inputProps.autoComplete ?? "password"}
      />
      <InputGroup.Suffix className="px-1">
        <GhostButton
          accessibilityRole="button"
          accessibilityLabel={showPassword ? "Hide password" : "Show password"}
          accessibilityState={{ selected: showPassword }}
          className="size-11 rounded-full"
          onPress={() => setShowPassword(!showPassword)}
        >
          <SymbolView
            name={{
              ios: showPassword ? "eye.slash" : "eye",
              android: showPassword ? "visibility_off" : "visibility",
            }}
            size={18}
          />
        </GhostButton>
      </InputGroup.Suffix>
    </InputGroup>
  );
};
