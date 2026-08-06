import { useFieldContext } from "@/utils/form-hook-context";
import {
  Button,
  Host,
  OutlinedTextField,
  Text,
} from "@expo/ui/jetpack-compose";
import { SymbolView } from "expo-symbols";
import React, { useState } from "react";

interface Props extends React.ComponentProps<typeof OutlinedTextField> {
  label: string;
  placeholder?: string;
  supportingText?: string;
  disabled?: boolean;
}

export const PasswordInput = ({
  label,
  placeholder,
  disabled,
  ...props
}: Props) => {
  const field = useFieldContext<string | undefined>();
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  return (
    <Host matchContents>
      <OutlinedTextField
        isError={isInvalid}
        enabled={!disabled}
        visualTransformation={"password"}
        {...props}
      >
        <OutlinedTextField.Label>
          <Text>{label}</Text>
        </OutlinedTextField.Label>
        {placeholder && (
          <OutlinedTextField.Placeholder>
            <Text>{placeholder}</Text>
          </OutlinedTextField.Placeholder>
        )}
        <OutlinedTextField.TrailingIcon>
          <Button onClick={togglePasswordVisibility}>
            <SymbolView
              name={
                isPasswordVisible
                  ? {
                      ios: "eye",
                      android: "visibility",
                    }
                  : {
                      ios: "eye.slash",
                      android: "visibility_off",
                    }
              }
            />
          </Button>
        </OutlinedTextField.TrailingIcon>
        {props.supportingText && (
          <OutlinedTextField.SupportingText>
            <Text>{props.supportingText}</Text>
          </OutlinedTextField.SupportingText>
        )}
      </OutlinedTextField>
    </Host>
  );
};
