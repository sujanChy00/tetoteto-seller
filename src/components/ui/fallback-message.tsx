import { useLanguage } from "@/hooks/use-language";
import { ILanguageTexts } from "@/types";
import React from "react";
import { Text, View } from "react-native";
import { twMerge } from "tailwind-merge";
import { StyledImage } from "./image";

type Props = {
  message?: string;
  className?: string;
  children?: React.ReactNode;
  translatedMessage?: ILanguageTexts;
};

export const FalllBackMesage = ({
  message,
  className,
  children,
  translatedMessage,
}: Props) => {
  const { t } = useLanguage();
  return (
    <View className={twMerge("flex-1 items-center justify-center", className)}>
      <View className="items-center gap-y-2">
        <StyledImage
          alt={message}
          source={require("@/assets/images/opps.png")}
          style={{ width: 100, height: 100 }}
          contentFit="contain"
        />
        {children ? (
          children
        ) : (
          <Text className="text-center font-medium text-gray-950 dark:text-red-500">
            {message || t(translatedMessage || "no_results")}
          </Text>
        )}
      </View>
    </View>
  );
};
