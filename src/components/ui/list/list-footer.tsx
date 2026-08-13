import React from "react";
import { StyleProp, View, ViewStyle } from "react-native";
import { twMerge } from "tailwind-merge";

export const ListFooter = React.memo(
  ({
    className,
    style,
  }: {
    className?: string;
    style?: StyleProp<ViewStyle>;
  }) => {
    return <View className={twMerge("h-20", className)} style={style} />;
  },
);
