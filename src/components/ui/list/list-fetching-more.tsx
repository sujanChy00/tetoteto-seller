import { memo } from "react";
import { ActivityIndicator, View } from "react-native";
import { twMerge } from "tailwind-merge";

interface Props {
  isFetchingNextPage: boolean;
  className?: string;
  hasNextPage?: boolean;
}
export const ListFetchingMore = memo(
  ({ isFetchingNextPage, className, hasNextPage }: Props) => {
    if (!isFetchingNextPage || !hasNextPage) return null;

    return (
      <View className={twMerge("items-center justify-center py-4", className)}>
        <ActivityIndicator />
      </View>
    );
  },
);
