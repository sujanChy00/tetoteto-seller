import { AnimatedView } from "@/components/ui/animated-view";
import { Skeleton } from "@/components/ui/skeleton";
import { LinearTransition, ZoomIn, ZoomOut } from "react-native-reanimated";

interface Props {
  numberOfImageSelected: number;
  addingImage: boolean;
}

export const ThumbnailLoadingSkeleton = ({
  addingImage,
  numberOfImageSelected,
}: Props) => {
  if (addingImage)
    return Array.from({ length: numberOfImageSelected }).map((_, i) => (
      <AnimatedView
        key={i}
        entering={ZoomIn}
        exiting={ZoomOut}
        layout={LinearTransition}
      >
        <Skeleton className={"rounded-2xl h-20"} />
      </AnimatedView>
    ));

  return null;
};
