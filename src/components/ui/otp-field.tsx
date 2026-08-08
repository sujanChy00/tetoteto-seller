import { useFieldContext } from "@/utils/form-hook-context";
import { Activity } from "react";
import { View } from "react-native";
import { twMerge } from "tailwind-merge";
import { InputOTP, InputOTPProps } from "./otp-input";
import { ThemedText } from "./themed-text";

export const OTPField = ({
  label,
  className,
  ...rest
}: Omit<InputOTPProps, "value" | "onChangeText"> & {
  label?: string;
  className?: string;
}) => {
  const field = useFieldContext<string | undefined>();
  const fieldError = field.state.meta.errors?.[0];

  return (
    <View className={twMerge("w-full gap-y-1", className)}>
      <Activity mode={label ? "visible" : "hidden"}>
        <ThemedText className="font-semibold">{label}</ThemedText>
      </Activity>
      <InputOTP
        value={field.state.value}
        onChangeText={field.handleChange}
        onBlur={field.handleBlur}
        error={fieldError}
        {...rest}
      />
    </View>
  );
};
