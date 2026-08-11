import { View, ViewProps } from "react-native";
import { twMerge } from "tailwind-merge";

export const Surface = ({ className, ...rest }: ViewProps) => {
  return (
    <View
      className={twMerge("bg-surface rounded-3xl shadow p-3", className)}
      {...rest}
    />
  );
};
