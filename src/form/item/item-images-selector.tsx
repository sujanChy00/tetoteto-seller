import { AnimatedView } from "@/components/ui/animated-view";
import { SecondaryButton } from "@/components/ui/button";
import { FullScreenSpinner } from "@/components/ui/full-screen-spinner";
import { StyledImage } from "@/components/ui/image";
import { StyledSymbolView } from "@/components/ui/symbol-view";
import { ThemedText } from "@/components/ui/themed-text";
import {
  useDeleteItemImage,
  useUploadItemImage,
} from "@/mutation/item-mutation";
import {
  BottomSheetModal,
  BottomSheetView,
} from "@expo/ui/community/bottom-sheet";
import * as ImagePicker from "expo-image-picker";
import { Link } from "expo-router";
import { useCallback, useRef } from "react";
import { Pressable, TouchableOpacity, View } from "react-native";
import {
  Easing,
  LinearTransition,
  ZoomIn,
  ZoomOut,
} from "react-native-reanimated";
import { twMerge } from "tailwind-merge";

interface ItemImageSelectorProps {
  onChange: (images: string[]) => void;
  value: string[];
}

export const ItemImageSelector = ({
  onChange,
  value,
}: ItemImageSelectorProps) => {
  const uploadMutation = useUploadItemImage();
  const deleteMutation = useDeleteItemImage({
    onSuccess: (_, img) => {
      const updatedValue = value.filter((i) => i !== img);
      onChange(updatedValue);
    },
  });
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const onDelete = async (img: string) => {
    await deleteMutation.mutateAsync(img);
  };

  const openSheet = useCallback(() => {
    if (!bottomSheetRef.current) return;
    bottomSheetRef.current.present();
  }, []);

  const closeSheet = useCallback(() => {
    if (!bottomSheetRef.current) return;
    bottomSheetRef.current.close();
  }, []);

  const pickImage = useCallback(async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      quality: 1,
      allowsMultipleSelection: true,
      selectionLimit: 4 - value.length,
    });

    if (result.canceled || result.assets.length === 0) return;
    const uris = result.assets.map((a) => a.uri as string);

    closeSheet();

    await uploadMutation.mutateAsync(uris, {
      onSuccess: (data) => {
        onChange([...value, ...data]);
      },
    });
  }, [value, onChange, closeSheet]);

  const takePicture = useCallback(async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();

    if (status !== ImagePicker.PermissionStatus.GRANTED) {
      alert("Sorry, we need camera permissions to make this work!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync();

    if (result.canceled || result.assets.length === 0) return;

    const uris = result.assets.map((img) => img.uri);

    closeSheet();
    await uploadMutation.mutateAsync(uris, {
      onSuccess: (data) => {
        onChange([...value, ...data]);
      },
    });
  }, [value, onChange, closeSheet]);

  const isPending = uploadMutation.isPending || deleteMutation.isPending;

  return (
    <View className="flex-row items-center justify-between gap-3 border border-separator rounded-3xl p-2">
      <FullScreenSpinner isVisible={isPending} />
      {value.length > 0 ? (
        <AnimatedView
          layout={LinearTransition.easing(Easing.ease)}
          className={twMerge(
            "flex-row items-center gap-3 flex-1",
            value.length === 4 ? "justify-between" : "",
          )}
        >
          {value.map((item) => (
            <AnimatedView
              exiting={ZoomOut.duration(100)}
              entering={ZoomIn.duration(100)}
              className="size-14 relative"
              key={item}
            >
              <Link
                href={{
                  pathname: "/image/[image]",
                  params: {
                    image: item,
                  },
                }}
              >
                <StyledImage
                  source={item}
                  className="size-full"
                  contentFit="contain"
                />
              </Link>
              <Pressable
                hitSlop={8}
                className="absolute -top-2 right-2 bg-separator rounded-full size-4 items-center justify-center"
                onPress={() => onDelete(item)}
              >
                <StyledSymbolView
                  size={12}
                  tintColorClassName="accent-danger"
                  name={{
                    android: "remove",
                    ios: "minus",
                  }}
                />
              </Pressable>
            </AnimatedView>
          ))}
        </AnimatedView>
      ) : (
        <ThemedText className="text-muted font-semibold pl-6">
          Upload images
        </ThemedText>
      )}
      {value.length < 4 && (
        <AnimatedView
          exiting={ZoomOut.duration(100)}
          entering={ZoomIn.duration(100)}
        >
          <TouchableOpacity
            disabled={isPending}
            onPress={openSheet}
            className="size-14 rounded-2xl items-center justify-center bg-separator"
          >
            <StyledSymbolView
              tintColorClassName="accent-primary"
              name={{
                android: "upload",
                ios: "square.and.arrow.up",
              }}
            />
          </TouchableOpacity>
        </AnimatedView>
      )}
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
    </View>
  );
};
