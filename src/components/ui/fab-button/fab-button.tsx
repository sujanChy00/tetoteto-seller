import { FabButtonProps } from "@/types/components";
import { SymbolView } from "expo-symbols";
import { TouchableOpacity, View } from "react-native";
import { twMerge } from "tailwind-merge";

export const FabButton = ({ className, onPress }: FabButtonProps) => {
  return (
    <View
      className={twMerge(
        "absolute bottom-safe-offset-8 right-safe-offset-6 z-20",
        className,
      )}
    >
      <TouchableOpacity
        onPress={onPress}
        className={
          "flexflex-row items-center justify-center rounded-3xl bg-primary size-16"
        }
      >
        <SymbolView
          size={28}
          name={{
            ios: "plus",
            android: "add",
          }}
        />
      </TouchableOpacity>
    </View>
  );
};
