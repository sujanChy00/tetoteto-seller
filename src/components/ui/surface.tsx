import { SurfaceProps } from "@/types/components";
import { View } from "react-native";
import { twMerge } from "tailwind-merge";

export const Surface = ({
  className,
  variant = "default",
  ...rest
}: SurfaceProps) => {
  const surfaceVariant = {
    default: "bg-surface",
    secondary: "bg-surface-secondary",
    tertiary: "bg-surface-tertiary",
    outlined: "bg-transparent border border-surface",
    transparent: "bg-transparent",
  };

  return (
    <View
      className={twMerge(
        surfaceVariant[variant],
        "rounded-3xl shadow p-3",
        className,
      )}
      {...rest}
    />
  );
};
