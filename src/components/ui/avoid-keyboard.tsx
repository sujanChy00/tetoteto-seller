import { ViewProps } from "react-native";
import { useAnimatedKeyboard } from "react-native-keyboard-controller";
import { useAnimatedStyle } from "react-native-reanimated";
import { AnimatedView } from "./animated-view";

export const AvoidKeyboard = ({ style, ...props }: ViewProps) => {
  const keyboard = useAnimatedKeyboard();
  const translateStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: -keyboard.height.value }],
  }));
  return (
    <AnimatedView style={[{ flex: 1 }, style, translateStyle]} {...props} />
  );
};
