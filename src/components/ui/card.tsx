import { SurfaceProps } from "@/types/components";
import { TextProps, View, ViewProps } from "react-native";
import { twMerge } from "tailwind-merge";
import { Surface } from "./surface";
import { ThemedText } from "./themed-text";

const Root = (props: SurfaceProps) => <Surface {...props} />;

const Header = (props: ViewProps) => <View {...props} />;
const Body = (props: ViewProps) => <View {...props} />;
const Footer = (props: ViewProps) => <View {...props} />;
const Title = ({ className, ...props }: TextProps) => (
  <ThemedText
    className={twMerge("text-lg font-medium text-foreground", className)}
    {...props}
  />
);
const Description = ({ className, ...props }: TextProps) => (
  <ThemedText
    className={twMerge("text-base text-muted", className)}
    {...props}
  />
);

export const Card = {
  Root,
  Header,
  Body,
  Footer,
  Title,
  Description,
};
