import { TextProps, View, ViewProps } from "react-native";
import { twMerge } from "tailwind-merge";
import { ThemedText } from "./themed-text";

const Field = ({ className, children }: ViewProps) => {
  return (
    <View className={twMerge("gap-1.5 w-full", className)}>{children}</View>
  );
};

const FieldLabel = ({ className, ...rest }: TextProps) => {
  return (
    <ThemedText
      className={twMerge("text-base font-medium", className)}
      {...rest}
    />
  );
};
const FieldError = ({ className, ...rest }: TextProps) => {
  return (
    <ThemedText
      className={twMerge("text-danger text-sm", className)}
      {...rest}
    />
  );
};
const FieldSupportingText = ({ className, ...rest }: TextProps) => {
  return (
    <ThemedText
      className={twMerge("text-muted text-xs", className)}
      {...rest}
    />
  );
};

export { Field, FieldError, FieldLabel, FieldSupportingText };
