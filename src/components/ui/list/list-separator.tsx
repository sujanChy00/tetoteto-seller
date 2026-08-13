import React from "react";
import { StyleProp, View, ViewStyle } from "react-native";
import { twMerge } from "tailwind-merge";

export const ListSeparator = React.memo(
  ({
    className,
    style,
  }: {
    className?: string;
    style?: StyleProp<ViewStyle>;
  }) => {
    return <View className={twMerge("h-2.5", className)} style={style} />;
  },
);
