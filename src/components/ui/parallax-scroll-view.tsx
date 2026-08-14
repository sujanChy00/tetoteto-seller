import { useAppTheme } from "@/context/app-theme-provider";
import type { ReactElement } from "react";
import Animated, {
  AnimatedScrollViewProps,
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useReducedMotion,
  useScrollOffset,
} from "react-native-reanimated";
import { AnimatedView } from "./animated-view";

type Props = Omit<AnimatedScrollViewProps, "children"> & {
  headerHeight?: number;
  headerImage: ReactElement;
  children: React.ReactNode;
};

export function ParallaxScrollView({
  headerHeight = 250,
  headerImage,
  children,
  ...rest
}: Props) {
  const { colors } = useAppTheme();
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollOffset(scrollRef);
  const reduceMotion = useReducedMotion();
  const headerAnimatedStyle = useAnimatedStyle(() => {
    if (reduceMotion) {
      return { transform: [{ translateY: 0 }, { scale: 1 }] };
    }

    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-headerHeight, 0, headerHeight],
            [-headerHeight / 2, 0, headerHeight * 0.75],
          ),
        },
        {
          scale: interpolate(
            scrollOffset.value,
            [-headerHeight, 0, headerHeight],
            [2, 1, 1],
          ),
        },
      ],
    };
  });

  return (
    <Animated.ScrollView ref={scrollRef} {...rest} scrollEventThrottle={16}>
      <AnimatedView
        style={[
          {
            overflow: "hidden",
            height: headerHeight,
            backgroundColor: colors.background,
          },
          headerAnimatedStyle,
        ]}
      >
        {headerImage}
      </AnimatedView>
      {children}
    </Animated.ScrollView>
  );
}
