import { Text, TextProps } from "react-native";
import { twMerge } from "tailwind-merge";

export const ThemedText = ({ className, ...rest }: TextProps) => {
  return <Text className={twMerge("text-foreground", className)} {...rest} />;
};
