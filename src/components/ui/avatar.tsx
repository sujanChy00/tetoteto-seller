import { ImageProps } from "expo-image";
import { View, ViewProps } from "react-native";
import { twMerge } from "tailwind-merge";
import { AnimatedThemedText } from "./animted-themed-text";
import { StyledImage } from "./image";

const Root = ({ className, ...rest }: ViewProps) => {
  return (
    <View
      className={twMerge(
        "rounded-full size-10 bg-muted/40 items-center justify-center flex-row",
        className,
      )}
      {...rest}
    />
  );
};

const AvatarImage = ({
  className,
  source,
  children,
  ...rest
}: ImageProps & { children?: React.ReactNode }) => {
  if (!!source)
    return (
      <StyledImage
        // className={twMerge("rounded-full size-10 object-cover", className)}
        source={source}
        contentFit="cover"
        {...rest}
      />
    );
  return null;
};

const AvatarFallback = ({
  className,
  source,
  ...rest
}: React.ComponentProps<typeof AnimatedThemedText> & {
  source: string | undefined;
}) => {
  if (!!source) return null;

  return (
    <AnimatedThemedText
      className={twMerge("text-foreground text-center", className)}
      {...rest}
    />
  );
};

export const Avatar = Object.assign(Root, {
  Image: AvatarImage,
  Fallback: AvatarFallback,
});
