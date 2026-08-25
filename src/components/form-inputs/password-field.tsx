import { FormInputBaseProps } from "@/types/components";
import { useFieldContext } from "@/utils/form-hook-context";
import { useState } from "react";
import { TextInputProps } from "react-native";
import { GhostButton } from "../ui/button";
import { Field, FieldDescription, FieldError, FieldLabel } from "../ui/field";
import { InputGroup } from "../ui/input-group";
import { StyledSymbolView } from "../ui/symbol-view";

export const PasswordField = ({
  label,
  isDisabled = false,
  className,
  description,
  inputClassName,
  ...inputProps
}: FormInputBaseProps<TextInputProps>) => {
  const [showPassword, setShowPassword] = useState(false);
  const field = useFieldContext<string | undefined>();
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
  const fieldError = field.state.meta.errors?.[0];

  return (
    <Field className={className}>
      {!!label && <FieldLabel isInvalid={isInvalid}>{label}</FieldLabel>}
      <InputGroup
        className="pr-0"
        isInvalid={isInvalid}
        isDisabled={isDisabled}
      >
        <InputGroup.Prefix isDecorative>
          <StyledSymbolView
            name={{ ios: "lock.fill", android: "lock" }}
            size={18}
          />
        </InputGroup.Prefix>
        <InputGroup.Input
          {...inputProps}
          className={inputClassName}
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
            accessibilityLabel={
              showPassword ? "Hide password" : "Show password"
            }
            accessibilityState={{ selected: showPassword }}
            className="size-11 rounded-full"
            onPress={() => setShowPassword(!showPassword)}
          >
            <StyledSymbolView
              name={{
                ios: showPassword ? "eye.slash" : "eye",
                android: showPassword ? "visibility_off" : "visibility",
              }}
              size={18}
            />
          </GhostButton>
        </InputGroup.Suffix>
      </InputGroup>
      {!!description && <FieldDescription>{description}</FieldDescription>}
      {!!fieldError && (
        <FieldError>{fieldError ?? fieldError?.message}</FieldError>
      )}
    </Field>
  );
};
