import { Host } from "@/components/ui/host";
import { IconName, Row } from "@expo/ui";
import { ButtonRole } from "@expo/ui/swift-ui";
import { SFSymbol } from "expo-symbols";
import { ViewProps } from "react-native";
import { ILanguageTexts } from "./ILanguageTexts";

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
  hostProps?: React.ComponentProps<typeof Host>;
  fillFullWidth?: boolean;
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
  isInvalid?: boolean;
  errorMessage?: string;
  value?: string;
  onValueChange?: (text: string) => void;
  hostProps?: React.ComponentProps<typeof Host>;
  fillFullWidth?: boolean;
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

export interface SurfaceProps extends ViewProps {
  variant?: "default" | "secondary" | "tertiary" | "outlined" | "transparent";
}
