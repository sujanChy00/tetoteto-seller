import { IconName, ObservableState, Row } from "@expo/ui";
import { ButtonRole } from "@expo/ui/swift-ui";
import { SFSymbol } from "expo-symbols";
import { ILanguageTexts } from "./ILanguageTexts";

export interface UIButtonProps {
  variant?: "filled" | "outlined" | "elevated" | "text" | "default";
  children?: React.ReactElement;
  systemImageIos?: SFSymbol;
  roleIos?: ButtonRole;
  onPress?: () => void;
  size?: "mini" | "small" | "regular" | "large";
  disabled?: boolean;
  iconOnlyIos?: boolean;
  height?: number;
  width?: number;
  backgroundColor?: string;
  paddingHorizontal?: number;
  paddingVertical?: number;
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
  onSubmit?: () => void;
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
  onSubmit?: () => void;
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

export type DropdownMenuProps = {
  options: DropdownMenuOptions[];
  onSelect?: (v: string) => void;
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  IOSSystemImage?: SFSymbol;
  customLabel?: React.ReactNode;
  androidIcon?: IconName;
};

export type DropdownMenuOptions = {
  label: string;
  value: string;
  disabled?: boolean;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  IOSSystemImage?: SFSymbol;
  IOSRole?: ButtonRole;
};

export type AlertDialogProps = {
  title: string;
  message?: string;
  trigger: (open: () => void) => React.ReactNode;
  cancelButtonText?: ILanguageTexts;
  confirmButtonText?: ILanguageTexts;
  confirmButtonRole?: "default" | "destructive";
  onConfirm: () => void;
  isConfirming?: boolean;
};
