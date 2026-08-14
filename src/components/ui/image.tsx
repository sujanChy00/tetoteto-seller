import { Image, ImageProps } from "expo-image";
import { withUniwind } from "uniwind";

const ExpoImage = withUniwind(Image);

export const StyledImage = ({ source, placeholder, ...rest }: ImageProps) => {
  return (
    <ExpoImage
      placeholder={placeholder ?? require("@/assets/images/logo.png")}
      source={source}
      {...rest}
    />
  );
};
