import { View, ViewProps } from "react-native";
import { twMerge } from "tailwind-merge";

export const FabButton = ({ className, ...rest }: ViewProps) => {
  return (
    <View
      className={twMerge(
        "absolute bottom-safe-offset-8 right-safe-offset-6 z-20",
        className,
      )}
      {...rest}
    />
  );
};
