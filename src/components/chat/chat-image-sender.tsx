import { useSendMessage } from "@/mutation/chat-mutation";
import {
  BottomSheetModal,
  BottomSheetView,
} from "@expo/ui/community/bottom-sheet";
import * as ImagePicker from "expo-image-picker";
import { useLocalSearchParams } from "expo-router";
import { useCallback, useRef } from "react";
import { Pressable, View } from "react-native";
import { twMerge } from "tailwind-merge";
import { SecondaryButton } from "../ui/button";
import { StyledSymbolView } from "../ui/symbol-view";

interface Props {
  disabled?: boolean;
  className?: string;
}

export const ChatImageSender = ({ disabled, className }: Props) => {
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const { userId } = useLocalSearchParams<{ userId: string }>();
  const { mutate: sendMessage } = useSendMessage();

  const onOpen = useCallback(() => {
    if (!bottomSheetRef.current) return;
    bottomSheetRef.current.present();
  }, []);

  const onClose = useCallback(() => {
    if (!bottomSheetRef.current) return;
    bottomSheetRef.current.close();
  }, []);

  const takePicture = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();

    if (status !== "granted") {
      alert("Sorry, we need camera permissions to make this work!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ["images"],
      quality: 1,
    });

    if (result.canceled) return;

    const uri = result.assets[0]?.uri;
    sendMessage({
      userId: Number(userId),
      image: uri,
    });
    onClose();
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      quality: 1,
    });
    if (!result.canceled && result.assets) {
      const uri = result.assets[0]?.uri;
      sendMessage({
        userId: Number(userId),
        image: uri,
      });
      onClose();
    }
  };

  return (
    <>
      <Pressable
        disabled={disabled}
        hitSlop={10}
        onPress={onOpen}
        className={twMerge(
          "h-12 w-8 items-center self-end justify-center rounded-full",
          className,
        )}
      >
        <StyledSymbolView
          tintColorClassName="accent-foreground"
          name={{
            android: "photo",
            ios: "photo",
          }}
        />
      </Pressable>
      <BottomSheetModal ref={bottomSheetRef} enablePanDownToClose>
        <BottomSheetView>
          <View className="gap-3 p-4">
            <SecondaryButton onPress={pickImage}>
              <StyledSymbolView
                name={{ android: "photo", ios: "photo" }}
                tintColorClassName="accent-primary"
              />
              <SecondaryButton.Label>Open Gallery</SecondaryButton.Label>
            </SecondaryButton>
            <SecondaryButton onPress={takePicture}>
              <StyledSymbolView
                name={{ android: "camera", ios: "camera" }}
                tintColorClassName="accent-primary"
              />
              <SecondaryButton.Label>Take Photo</SecondaryButton.Label>
            </SecondaryButton>
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    </>
  );
};
