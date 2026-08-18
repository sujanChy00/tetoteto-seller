import { View, ViewProps } from "react-native";
import { twMerge } from "tailwind-merge";

interface Props extends ViewProps {
  variant: "success" | "danger" | "warning" | "info" | "primary";
}

export const Indicator = ({ variant, className, ...props }: Props) => {
  const color = {
    success: "bg-success",
    danger: "bg-danger",
    warning: "bg-warning",
    info: "bg-default",
    primary: "bg-primary",
  };
  return (
    <View
      {...props}
      className={twMerge(
        "size-1.5 rounded-full bg-default",
        color[variant],
        className,
      )}
    />
  );
};
