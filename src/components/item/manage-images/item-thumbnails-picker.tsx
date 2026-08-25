import { AnimatedView } from "@/components/ui/animated-view";
import { SecondaryButton } from "@/components/ui/button";
import { StyledSymbolView } from "@/components/ui/symbol-view";
import { ThemedText } from "@/components/ui/themed-text";
import {
  BottomSheetModal,
  BottomSheetView,
} from "@expo/ui/community/bottom-sheet";
import * as ImagePicker from "expo-image-picker";
import { useCallback, useRef } from "react";
import { Pressable, View } from "react-native";
import { LinearTransition, ZoomIn, ZoomOut } from "react-native-reanimated";

interface Props {
  itemId: string;
  images: string[];
  setNumberOfImageSelected: (v: number) => void;
  disabled: boolean;
  onImageChange: (img: string[]) => Promise<void>;
}

export const ItemThumbnailsPicker = ({
  images,
  itemId,
  setNumberOfImageSelected,
  disabled = false,
  onImageChange,
}: Props) => {
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  const openSheet = useCallback(() => {
    if (!bottomSheetRef.current) return;
    bottomSheetRef.current.present();
  }, []);

  const closeSheet = useCallback(() => {
    if (!bottomSheetRef.current) return;
    bottomSheetRef.current.close();
  }, []);

  const takePicture = useCallback(async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();

    if (status !== ImagePicker.PermissionStatus.GRANTED) {
      alert("Sorry, we need camera permissions to make this work!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync();

    if (result.canceled || result.assets.length === 0) return;

    const uris = result.assets.map((img) => img.uri);
    setNumberOfImageSelected(uris.length);
    closeSheet();
    await onImageChange(uris);
  }, [closeSheet, itemId]);

  const pickImage = useCallback(async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      quality: 1,
      allowsMultipleSelection: true,
      selectionLimit: 4 - images.length,
    });

    if (result.canceled || result.assets.length === 0) return;
    const uris = result.assets.map((a) => a.uri as string);
    setNumberOfImageSelected(uris.length);
    closeSheet();
    await onImageChange(uris);
  }, [closeSheet, images, itemId]);

  return (
    <>
      <AnimatedView layout={LinearTransition} className="gap-y-1">
        {images.length < 4 && (
          <AnimatedView
            entering={ZoomIn}
            exiting={ZoomOut}
            layout={LinearTransition}
          >
            <Pressable
              disabled={disabled}
              onPress={openSheet}
              className="bg-surface items-center flex-row justify-between border-warning border-dashed gap-3 rounded-2xl p-4 border"
            >
              <View className="flex-row items-center gap-3">
                <View className="size-8 rounded-xl items-center justify-center bg-warning">
                  <StyledSymbolView
                    name={{
                      android: "upload",
                      ios: "square.and.arrow.up",
                    }}
                    tintColorClassName="accent-warning-foreground"
                    size={16}
                  />
                </View>
                <View>
                  <ThemedText className="text-base font-semibold">
                    Add another image
                  </ThemedText>
                  <ThemedText className="text-xs text-muted">
                    JPG or PNG - up to 10 MB
                  </ThemedText>
                </View>
              </View>
              <StyledSymbolView
                name={{
                  android: "add_photo_alternate",
                  ios: "photo.badge.plus",
                }}
                tintColorClassName="accent-muted"
              />
            </Pressable>
          </AnimatedView>
        )}
        <ThemedText className="text-muted text-xs font-medium">
          *You can only add 4 images
        </ThemedText>
      </AnimatedView>
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
