import { ButtonProps } from "@expo/ui/swift-ui";

export interface UIButtonProps {
  variant?: "filled" | "outlined" | "elevated" | "text" | "default";
  label: string;
  children?: React.ReactNode;
  systemImage?: ButtonProps["systemImage"];
  role?: ButtonProps["role"];
  onPress?: () => void;
}

export type TextFieldKeyboardType =
  | "email"
  | "number"
  | "decimal"
  | "numberPassword"
  | "phone"
  | "text"
  | "uri"
  | "ascii";
