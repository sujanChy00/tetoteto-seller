import { ButtonProps } from "@expo/ui/swift-ui";

export interface UIButtonProps {
  variant?: "filled" | "outlined" | "elevated" | "text" | "default";
  children?: React.ReactElement;
  systemImageIos?: ButtonProps["systemImage"];
  roleIos?: ButtonProps["role"];
  onPress?: () => void;
  paddingHorizontal?: number;
  useFullWidth?: boolean;
  paddingVertical?: number;
  size?: "mini" | "small" | "regular" | "large";
  disabled?: boolean;
  iconOnlyIos?: boolean;
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
  paddingHorizontal?: number;
  useFullWidth?: boolean;
  paddingVertical?: number;
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
  paddingHorizontal?: number;
  useFullWidth?: boolean;
  paddingVertical?: number;
};

export type UiSpinnerProps = {
  size?: number;
  color?: string;
  strokeWidth?: number;
};
