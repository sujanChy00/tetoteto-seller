import { AnimatedView } from "@/components/ui/animated-view";
import { Avatar } from "@/components/ui/avatar";
import { OutlineButton } from "@/components/ui/button";
import { ThemedText } from "@/components/ui/themed-text";
import { getAvatarName } from "@/utils/avatar-name";
import * as ImagePicker from "expo-image-picker";
import { Link } from "expo-router";
import { SymbolView } from "expo-symbols";
import { useCallback } from "react";
import { ActivityIndicator, View } from "react-native";
import { FadeIn, FadeOut } from "react-native-reanimated";
import { useCSSVariable } from "uniwind";

interface ProfileImagePickerProps {
  value: string | undefined;
  onChange: (value: string) => void;
  isUploading: boolean;
  disabled?: boolean;
  caption?: string;
  subCaption?: string;
  fallback: string;
  imagePickerOptions?: ImagePicker.ImagePickerOptions;
}

export const ProfileImagePicker = ({
  value,
  onChange,
  isUploading,
  disabled,
  caption,
  subCaption,
  fallback,
  imagePickerOptions,
}: ProfileImagePickerProps) => {
  const defaultForegroundColor = useCSSVariable(
    "--color-default-foreground",
  ) as string;

  const pickImage = useCallback(async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      quality: 1,
      ...imagePickerOptions,
    });

    if (!result.canceled) {
      const asset = result.assets[0];
      if (asset) {
        if (asset.uri) {
          const localUri = asset.uri as string;
          onChange(localUri);
        }
      }
    }
  }, []);

  const takePicture = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();

    if (status !== ImagePicker.PermissionStatus.GRANTED) {
      alert("Sorry, we need camera permissions to make this work!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync();

    if (result.canceled) return;

    const uri = result.assets[0]?.uri;
    onChange(uri);
  };

  return (
    <View className="w-full gap-y-3">
      <View className="gap-y-1 items-center">
        <Link
          href={{
            pathname: "/image/[image]",
            params: {
              image: value ?? "",
            },
          }}
        >
          <Link.AppleZoom>
            <Avatar className="size-28 relative overflow-hidden">
              {isUploading && (
                <AnimatedView
                  entering={FadeIn}
                  exiting={FadeOut}
                  className="absolute inset-0 bg-black/50 items-center justify-center z-20"
                >
                  <ActivityIndicator size="large" />
                </AnimatedView>
              )}
              <Avatar.Image
                className="size-full"
                alt={fallback}
                source={value}
              />
              <Avatar.Fallback className={"text-2xl"} source={value}>
                {getAvatarName(fallback)}
              </Avatar.Fallback>
            </Avatar>
          </Link.AppleZoom>
        </Link>
        {!!caption ||
          (!!subCaption && (
            <View>
              {caption && (
                <ThemedText className="text-base font-medium text-center capitalize">
                  {caption}
                </ThemedText>
              )}
              {subCaption && (
                <ThemedText className="text-muted text-center">
                  {subCaption}
                </ThemedText>
              )}
            </View>
          ))}
      </View>
      <View className="justify-center flex-row items-center gap-3">
        <OutlineButton onPress={takePicture} disabled={isUploading || disabled}>
          <SymbolView
            tintColor={defaultForegroundColor}
            name={{
              android: "photo_camera",
              ios: "camera",
            }}
            size={16}
          />
          <OutlineButton.Label>Camera</OutlineButton.Label>
        </OutlineButton>
        <OutlineButton onPress={pickImage} disabled={isUploading || disabled}>
          <SymbolView
            tintColor={defaultForegroundColor}
            name={{
              android: "photo_library",
              ios: "photo.on.rectangle",
            }}
            size={16}
          />
          <OutlineButton.Label>Gallery</OutlineButton.Label>
        </OutlineButton>
      </View>
    </View>
  );
};
