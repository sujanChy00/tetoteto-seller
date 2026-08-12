import Animated from "react-native-reanimated";
import { withUniwind } from "uniwind";
import { ThemedText } from "./themed-text";

const AnimatedText = Animated.createAnimatedComponent(ThemedText);

export const AnimatedThemedText = withUniwind(AnimatedText);
