import { SymbolView } from "expo-symbols";
import { View } from "react-native";
import { twMerge } from "tailwind-merge";
import { useCSSVariable } from "uniwind";
import { Button } from "./button";

export type FabButtonProps = {
  onPress: () => void;
  className?: string;
};

export const FabButton = ({ className, onPress }: FabButtonProps) => {
  const primaryForegroundColor = useCSSVariable(
    "--color-primary-foreground",
  ) as string;
  return (
    <View
      className={twMerge(
        "absolute bottom-safe-offset-8 right-safe-offset-6 z-20",
        className,
      )}
    >
      <Button.Primary onPress={onPress} className={"size-16"}>
        <SymbolView
          size={28}
          name={{
            ios: "plus",
            android: "add",
          }}
          tintColor={primaryForegroundColor}
        />
      </Button.Primary>
    </View>
  );
};
