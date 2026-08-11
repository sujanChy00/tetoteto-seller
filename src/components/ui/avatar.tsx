import { Image, ImageProps } from "expo-image";
import { TextProps, View, ViewProps } from "react-native";
import { twMerge } from "tailwind-merge";
import { ThemedText } from "./themed-text";

const Root = ({ className, ...rest }: ViewProps) => {
  return (
    <View
      className={twMerge(
        "rounded-full size-10 bg-muted/40 items-center justify-center",
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
    return <Image className={twMerge("rounded-full", className)} {...rest} />;
  return null;
};

const AvatarFallback = ({ className, ...rest }: TextProps) => {
  return (
    <ThemedText
      className={twMerge("text-foreground text-center", className)}
      {...rest}
    />
  );
};

export const Avatar = { Image: AvatarImage, Fallback: AvatarFallback, Root };
