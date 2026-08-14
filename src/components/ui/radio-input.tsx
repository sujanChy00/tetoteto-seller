import { Pressable, View } from "react-native";
import { ZoomIn, ZoomOut } from "react-native-reanimated";
import { twMerge } from "tailwind-merge";
import { AnimatedView } from "./animated-view";
import { ThemedText } from "./themed-text";

interface RadioInputProps {
  selected: boolean;
  onPress: () => void;
  className?: string;
  label?: string;
  disabled?: boolean;
}

export const RadioInput = ({
  selected,
  onPress,
  className,
  label,
  disabled = false,
}: RadioInputProps) => {
  return (
    <Pressable
      disabled={disabled}
      accessibilityRole="radio"
      className={twMerge(
        "flex-row items-center justify-between gap-3",
        className,
      )}
      onPress={() => {
        onPress();
      }}
    >
      {label && <ThemedText>{label}</ThemedText>}
      <View className="rounded-full size-6 border-2 border-primary items-center justify-center">
        {selected && (
          <AnimatedView
            entering={ZoomIn.duration(100)}
            exiting={ZoomOut.duration(100)}
            className="bg-primary rounded-full size-4"
          />
        )}
      </View>
    </Pressable>
  );
};
