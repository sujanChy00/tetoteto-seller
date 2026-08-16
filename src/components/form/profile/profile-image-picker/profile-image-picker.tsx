import { Avatar } from "@/components/ui/avatar";
import { OutlineButton } from "@/components/ui/button";
import { ThemedText } from "@/components/ui/themed-text";
import { useUser } from "@/hooks/use-user";
import { getAvatarName } from "@/utils/avatar-name";
import * as ImagePicker from "expo-image-picker";
import { Link } from "expo-router";
import { SymbolView } from "expo-symbols";
import { useCallback } from "react";
import { View } from "react-native";
import { useCSSVariable } from "uniwind";

interface ProfileImagePickerProps {
  value: string | undefined;
  onChange: (value: string) => void;
}

export const ProfileImagePicker = ({
  value,
  onChange,
}: ProfileImagePickerProps) => {
  const { user } = useUser();
  const defaultForegroundColor = useCSSVariable(
    "--color-default-foreground",
  ) as string;

  const pickImage = useCallback(async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
      shape: "oval",
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
            <Avatar.Root className="size-28">
              <Avatar.Image
                className="size-full"
                alt={user?.profileDetails.shopAssistantName}
                source={value}
              />
              <Avatar.Fallback className={"text-2xl"} source={value}>
                {getAvatarName(user?.profileDetails.shopAssistantName)}
              </Avatar.Fallback>
            </Avatar.Root>
          </Link.AppleZoom>
        </Link>
        <View>
          <ThemedText className="text-base font-medium text-center capitalize">
            {user?.profileDetails.shopAssistantName}
          </ThemedText>
          <ThemedText className="text-muted text-center">
            {user?.profileDetails.shopAssistantEmail}
          </ThemedText>
        </View>
      </View>
      <View className="justify-center flex-row items-center gap-3">
        <OutlineButton onPress={takePicture}>
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
        <OutlineButton onPress={pickImage}>
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
