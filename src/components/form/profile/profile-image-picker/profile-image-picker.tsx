import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Host } from "@/components/ui/host";
import { ThemedText } from "@/components/ui/themed-text";
import { useUser } from "@/hooks/use-user";
import { getAvatarName } from "@/utils/avatar-name";
import { Icon, Row, Spacer, Text } from "@expo/ui";
import * as ImagePicker from "expo-image-picker";
import { Link } from "expo-router";
import { useCallback } from "react";
import { View } from "react-native";

const GALLERY_ICON = Icon.select({
  android: import("@expo/material-symbols/photo_library.xml"),
  ios: "photo.on.rectangle",
});

const CAMERA_ICON = Icon.select({
  android: import("@expo/material-symbols/photo_camera.xml"),
  ios: "camera",
});

interface ProfileImagePickerProps {
  value: string | undefined;
  onChange: (value: string) => void;
}

export const ProfileImagePicker = ({
  value,
  onChange,
}: ProfileImagePickerProps) => {
  const { user } = useUser();

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
      <Host matchContents={{ vertical: true }} style={{ width: "100%" }}>
        <Row alignment="center">
          <Spacer flexible />
          <Button
            fillFullWidth={false}
            variant="outlined"
            onPress={takePicture}
          >
            <Row alignment="center">
              <Icon name={CAMERA_ICON} size={16} />
              <Spacer size={3} />
              <Text>Camera</Text>
            </Row>
          </Button>
          <Spacer size={6} />
          <Button fillFullWidth={false} variant="outlined" onPress={pickImage}>
            <Row alignment="center">
              <Icon name={GALLERY_ICON} size={16} />
              <Spacer size={3} />
              <Text>Gallery</Text>
            </Row>
          </Button>
          <Spacer flexible />
        </Row>
      </Host>
    </View>
  );
};
