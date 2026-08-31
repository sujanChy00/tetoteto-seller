import { Link } from "expo-router";
import { FadeInUp, LinearTransition } from "react-native-reanimated";
import { AnimatedView } from "../../ui/animated-view";
import { StyledImage } from "../../ui/image";

interface Props {
  currentThumbnail: string;
}

export const ItemCurrentThumbnail = ({ currentThumbnail }: Props) => {
  if (!currentThumbnail) return null;
  return (
    <AnimatedView entering={FadeInUp} layout={LinearTransition}>
      <Link
        className="w-full"
        href={{
          pathname: "/image/[image]",
          params: {
            image: currentThumbnail,
          },
        }}
      >
        <StyledImage
          source={currentThumbnail}
          alt={"current-thumbnail"}
          className="h-40 w-full"
          contentFit="contain"
        />
      </Link>
    </AnimatedView>
  );
};
