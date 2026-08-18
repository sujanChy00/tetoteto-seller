import { Host } from "@/components/ui/host";
import { Row } from "@expo/ui";
import { MenuAction } from "@expo/ui/community/menu";
import { ViewProps } from "react-native";
import { ILanguageTexts } from "./ILanguageTexts";

export interface RadioInputProps {
  selected: boolean;
  onPress: () => void;
  className?: string;
  label?: string;
  disabled?: boolean;
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
  children: React.ReactNode;
  onValueChange: (value: string) => void;
  nativeOptions: MenuAction[];
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

export type FormInputBaseProps<T> = T & {
  label?: string;
  isDisabled?: boolean;
  description?: string;
  inputClassName?: string;
};
