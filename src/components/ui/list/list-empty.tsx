import { ILanguageTexts } from "@/types";
import React from "react";
import { ActivityIndicator, View } from "react-native";
import { twMerge } from "tailwind-merge";
import { FalllBackMesage } from "../fallback-message";

interface Props {
  isPending: boolean;
  className?: string;
  emptyStateMessage?: ILanguageTexts;
}

export const ListEmpty = React.memo(
  ({ className, isPending, emptyStateMessage }: Props) => {
    if (isPending)
      return (
        <View
          className={twMerge("flex-1 items-center justify-center", className)}
        >
          <ActivityIndicator size={50} />
        </View>
      );
    return (
      <FalllBackMesage
        className={className}
        translatedMessage={emptyStateMessage}
      />
    );
  },
);
