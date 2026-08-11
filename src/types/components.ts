import { ObservableState, Row } from "@expo/ui";
import { ButtonProps } from "@expo/ui/swift-ui";

export interface UIButtonProps {
  variant?: "filled" | "outlined" | "elevated" | "text" | "default";
  children?: React.ReactElement;
  systemImageIos?: ButtonProps["systemImage"];
  roleIos?: ButtonProps["role"];
  onPress?: () => void;
  size?: "mini" | "small" | "regular" | "large";
  disabled?: boolean;
  iconOnlyIos?: boolean;
  height?: number;
  width?: number;
}

export type UITextProps = {
  color?: string;
  fontSize?: number;
  fontWeight?: "normal" | "bold" | "light" | "thin" | "ultraLight" | "heavy";
  align?: "left" | "center" | "right";
};

export type TextFieldKeyboardType =
  | "email"
  | "number"
  | "decimal"
  | "numberPassword"
  | "phone"
  | "text"
  | "uri"
  | "ascii";

export type PasswordFieldProps = {
  label: string;
  placeholder?: string;
  disabled?: boolean;
  autoFocus?: boolean;
};

export type TextFieldProps = {
  label: string;
  placeholder?: string;
  prefix?: string;
  suffix?: string;
  leadingIcon?: string;
  trailingIcon?: string;
  disabled?: boolean;
  keyboardType?: TextFieldKeyboardType;
  autoFocus?: boolean;
  multiLine?: boolean;
  maxLines?: number;
};
export type TextInputProps = {
  label?: string;
  placeholder?: string;
  prefix?: string;
  suffix?: string;
  leadingIcon?: string;
  trailingIcon?: string;
  disabled?: boolean;
  keyboardType?: TextFieldKeyboardType;
  autoFocus?: boolean;
  isInvalid?: boolean;
  variant?: "default" | "filled" | "outline";
  multiLine?: boolean;
  maxLines?: number;
  value?: ObservableState<string>;
  onValueChange?: (text: string) => void;
};

export type UiSpinnerProps = {
  size?: number;
  color?: string;
  strokeWidth?: number;
};

export type UIRowProps = Omit<React.ComponentProps<typeof Row>, "modifiers"> & {
  fillFullWidth?: boolean;
  paddingVertical?: number;
  paddingHorizontal?: number;
};
