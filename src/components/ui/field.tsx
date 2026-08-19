import { TextProps, View, ViewProps } from "react-native";
import { twMerge } from "tailwind-merge";
import { ThemedText } from "./themed-text";

interface FieldLabelProps extends TextProps {
  isInvalid?: boolean;
  isDisabled?: boolean;
}

const Field = ({ className, children }: ViewProps) => {
  return (
    <View className={twMerge("gap-1.5 w-full", className)}>{children}</View>
  );
};

const FieldLabel = ({
  className,
  isInvalid = false,
  isDisabled = false,
  ...rest
}: FieldLabelProps) => {
  return (
    <ThemedText
      className={twMerge(
        "font-medium",
        isInvalid ? "text-danger" : "text-foreground",
        isDisabled ? "text-muted" : undefined,
        className,
      )}
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
const FieldDescription = ({ className, ...rest }: TextProps) => {
  return (
    <ThemedText
      className={twMerge("text-muted text-xs", className)}
      {...rest}
    />
  );
};

export { Field, FieldDescription, FieldError, FieldLabel };
