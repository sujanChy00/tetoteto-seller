import { TextInputProps } from "@/types/components";
import {
  BasicTextField,
  Box,
  ObservableState,
  OutlinedTextField,
  Text,
  TextField,
} from "@expo/ui/jetpack-compose";

export const TextInput = ({
  autoFocus,
  disabled,
  keyboardType,
  label,
  isInvalid,
  leadingIcon,
  placeholder,
  prefix,
  suffix,
  trailingIcon,
  maxLines,
  multiLine,
  variant = "default",
  onValueChange,
  value,
}: TextInputProps) => {
  if (variant === "outline")
    return (
      <OutlinedTextField
        value={value as ObservableState<string>}
        onValueChange={onValueChange}
        singleLine={!multiLine}
        maxLines={maxLines}
        autoFocus={autoFocus}
        isError={isInvalid}
        enabled={!disabled}
        keyboardOptions={{
          keyboardType,
          capitalization: "none",
          autoCorrectEnabled: false,
        }}
      >
        <OutlinedTextField.Label>
          <Text>{label}</Text>
        </OutlinedTextField.Label>
        {placeholder ? (
          <OutlinedTextField.Placeholder>
            <Text>{placeholder}</Text>
          </OutlinedTextField.Placeholder>
        ) : null}
        {leadingIcon ? (
          <OutlinedTextField.LeadingIcon>
            <Text>{leadingIcon}</Text>
          </OutlinedTextField.LeadingIcon>
        ) : null}
        {trailingIcon ? (
          <OutlinedTextField.TrailingIcon>
            <Text>{trailingIcon}</Text>
          </OutlinedTextField.TrailingIcon>
        ) : null}
        {prefix ? (
          <OutlinedTextField.Prefix>
            <Text>{prefix}</Text>
          </OutlinedTextField.Prefix>
        ) : null}
        {suffix ? (
          <OutlinedTextField.Suffix>
            <Text>{suffix}</Text>
          </OutlinedTextField.Suffix>
        ) : null}
      </OutlinedTextField>
    );
  if (variant === "filled")
    return (
      <TextField
        value={value as ObservableState<string>}
        onValueChange={onValueChange}
        singleLine={!multiLine}
        maxLines={maxLines}
        autoFocus={autoFocus}
        isError={isInvalid}
        enabled={!disabled}
        keyboardOptions={{
          keyboardType,
          capitalization: "none",
          autoCorrectEnabled: false,
        }}
      >
        <TextField.Label>
          <Text>{label}</Text>
        </TextField.Label>
        {placeholder ? (
          <TextField.Placeholder>
            <Text>{placeholder}</Text>
          </TextField.Placeholder>
        ) : null}
        {leadingIcon ? (
          <TextField.LeadingIcon>
            <Text>{leadingIcon}</Text>
          </TextField.LeadingIcon>
        ) : null}
        {trailingIcon ? (
          <TextField.TrailingIcon>
            <Text>{trailingIcon}</Text>
          </TextField.TrailingIcon>
        ) : null}
        {prefix ? (
          <TextField.Prefix>
            <Text>{prefix}</Text>
          </TextField.Prefix>
        ) : null}
        {suffix ? (
          <TextField.Suffix>
            <Text>{suffix}</Text>
          </TextField.Suffix>
        ) : null}
      </TextField>
    );
  return (
    <BasicTextField
      value={value as ObservableState<string>}
      onValueChange={onValueChange}
      singleLine={!multiLine}
      maxLines={maxLines}
      autoFocus={autoFocus}
      enabled={!disabled}
      keyboardOptions={{
        keyboardType,
        capitalization: "none",
        autoCorrectEnabled: false,
      }}
    >
      <BasicTextField.DecorationBox>
        <Box>
          {placeholder ? (
            <BasicTextField.Placeholder>
              <Text color="#9ca3af">{placeholder}</Text>
            </BasicTextField.Placeholder>
          ) : null}
          <BasicTextField.InnerTextField />
        </Box>
      </BasicTextField.DecorationBox>
    </BasicTextField>
  );
};
