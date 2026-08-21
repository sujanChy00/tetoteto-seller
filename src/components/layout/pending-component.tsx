import { ActivityIndicator, View } from "react-native";
import { twMerge } from "tailwind-merge";

export const PendingComponent = ({ className }: { className?: string }) => {
  return (
    <View className={twMerge("flex-1 items-center justify-center", className)}>
      <ActivityIndicator size={"large"} />
    </View>
  );
};
