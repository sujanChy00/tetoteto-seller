import { useAppTheme } from "@/context/app-theme-provider";
import { useUser } from "@/hooks/use-user";
import { getAvatarName } from "@/utils/avatar-name";
import { View } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  type SharedValue,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AnimatedView } from "../ui/animated-view";
import { AnimatedThemedText } from "../ui/animted-themed-text";
import { Avatar } from "../ui/avatar";

export const HEADER_MAX_HEIGHT = 96;
export const HEADER_MIN_HEIGHT = 56;
const SCROLL_RANGE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
const AVATAR_MAX = 56;
const AVATAR_MIN = 32;

export const ProfileHeader = ({
  scrollY,
}: {
  scrollY: SharedValue<number>;
}) => {
  const { user } = useUser();
  const { colors } = useAppTheme();
  const insets = useSafeAreaInsets();

  const containerStyle = useAnimatedStyle(() => ({
    height:
      interpolate(
        scrollY.value,
        [0, SCROLL_RANGE],
        [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
        Extrapolation.CLAMP,
      ) + insets.top,
  }));

  const avatarStyle = useAnimatedStyle(() => {
    const size = interpolate(
      scrollY.value,
      [0, SCROLL_RANGE],
      [AVATAR_MAX, AVATAR_MIN],
      Extrapolation.CLAMP,
    );
    return { width: size, height: size };
  });

  const nameStyle = useAnimatedStyle(() => ({
    fontSize: interpolate(
      scrollY.value,
      [0, SCROLL_RANGE],
      [18, 15],
      Extrapolation.CLAMP,
    ),
  }));

  const subtitleContainerStyle = useAnimatedStyle(() => ({
    height: interpolate(
      scrollY.value,
      [0, SCROLL_RANGE * 0.6],
      [18, 0],
      Extrapolation.CLAMP,
    ),
    opacity: interpolate(
      scrollY.value,
      [0, SCROLL_RANGE * 0.6],
      [1, 0],
      Extrapolation.CLAMP,
    ),
  }));

  const fallbackTextStyle = useAnimatedStyle(() => ({
    fontSize: interpolate(
      scrollY.value,
      [0, SCROLL_RANGE],
      [24, 16],
      Extrapolation.CLAMP,
    ),
  }));

  return (
    <AnimatedView
      className="absolute left-0 right-0 top-0 z-10 border-b border-b-border"
      style={[
        { backgroundColor: colors.background, paddingTop: insets.top },
        containerStyle,
      ]}
    >
      <View className="flex-1 flex-row items-center gap-3 px-4">
        <Animated.View style={avatarStyle}>
          <Avatar.Root className="size-full">
            <Avatar.Image
              className="size-full"
              source={user?.profileDetails.shopAssistantPhotoUrl}
              alt={user?.profileDetails.shopAssistantName}
            />
            <Avatar.Fallback
              style={fallbackTextStyle}
              source={user?.profileDetails.shopAssistantPhotoUrl}
            >
              {getAvatarName(user?.profileDetails.shopAssistantName)}
            </Avatar.Fallback>
          </Avatar.Root>
        </Animated.View>
        <View>
          <AnimatedThemedText className="capitalize" style={nameStyle}>
            {user?.profileDetails.shopAssistantName}
          </AnimatedThemedText>
          <Animated.View
            style={[{ overflow: "hidden" }, subtitleContainerStyle]}
          >
            <AnimatedThemedText className="text-muted">
              {user?.profileDetails.shopAssistantEmail}
            </AnimatedThemedText>
          </Animated.View>
        </View>
      </View>
    </AnimatedView>
  );
};
