import { TextProps, View, ViewProps } from "react-native";
import { twMerge } from "tailwind-merge";
import { ThemedText } from "./themed-text";

const Field = ({ className, children }: ViewProps) => {
  return (
    <View className={twMerge("gap-1.5 w-full", className)}>{children}</View>
  );
};

const FieldLabel = ({
  className,
  isInvalid = false,
  ...rest
}: TextProps & { isInvalid?: boolean }) => {
  return (
    <ThemedText
      className={twMerge(
        "text-base font-medium",
        isInvalid ? "text-danger" : "text-foreground",
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
