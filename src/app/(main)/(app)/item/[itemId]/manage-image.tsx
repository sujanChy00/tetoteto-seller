import { ItemDraggableImage } from "@/components/item/item-draggable-image";
import { PendingComponent } from "@/components/layout/pending-component";
import { SecondaryButton } from "@/components/ui/button";
import { FalllBackMesage } from "@/components/ui/fallback-message";
import { StyledSymbolView } from "@/components/ui/symbol-view";
import { ThemedText } from "@/components/ui/themed-text";
import { useRefreshOnFocus } from "@/hooks/use-refetch-onfocus";
import { useGetItemDetail } from "@/queries/item-query";
import {
  BottomSheetModal,
  BottomSheetView,
} from "@expo/ui/community/bottom-sheet";
import * as ImagePicker from "expo-image-picker";
import { useLocalSearchParams } from "expo-router";
import { useCallback, useRef, useState } from "react";
import { Pressable, View } from "react-native";
import type { SortableGridRenderItem } from "react-native-sortables";
import Sortable from "react-native-sortables";
import { useCSSVariable } from "uniwind";

const ManageItemImageScreen = () => {
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const [borderColor] = useCSSVariable(["--color-border"]) as [string];
  const { itemId } = useLocalSearchParams<{ itemId: string }>();
  const { data, isPending, refetch } = useGetItemDetail(itemId);
  const [currentThumbnail, setCurrentThumbnail] = useState(
    data?.itemImages.thumbnailImage,
  );
  useRefreshOnFocus(refetch);
  const [images, setImages] = useState<string[]>(
    data?.itemImages?.images?.map((img) => img) ?? [],
  );

  const onDeleteImage = useCallback(
    (item: string) => {
      setImages(images.filter((img) => img !== item));
    },
    [images],
  );

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
      selectionLimit: 4,
    });

    if (result.canceled || result.assets.length === 0) return;
    const uris = result.assets.map((a) => a.uri as string);

    closeSheet();
  }, [closeSheet]);

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
  }, [closeSheet]);

  const renderItem = useCallback<SortableGridRenderItem<string>>(
    ({ item, index }) => (
      <ItemDraggableImage
        onThumbnailChange={setCurrentThumbnail}
        thumbnail={currentThumbnail}
        index={index}
        item={item}
        onDeleteImage={onDeleteImage}
      />
    ),
    [currentThumbnail, onDeleteImage],
  );

  if (isPending) return <PendingComponent />;
  if (!data) return <FalllBackMesage />;
  return (
    <View className="flex-1 pt-safe-offset-20 px-4 gap-y-10">
      <View>
        <View className="flex-row items-center gap-3">
          <ThemedText className="text-2xl font-semibold flex-1">
            Order Your Images
          </ThemedText>
          <View className="border-border border rounded-full px-2 py-1">
            <ThemedText className="text-muted text-xs">
              {images.length} / 4
            </ThemedText>
          </View>
        </View>
        <ThemedText className="text-muted">
          Drag the handle to rearrange. Choose one image as your thumbnail.
        </ThemedText>
      </View>
      <View className="gap-y-4">
        <Sortable.Grid
          sortEnabled={true}
          showDropIndicator
          dropIndicatorStyle={{
            borderColor,
          }}
          enableActiveItemSnap
          hapticsEnabled
          columns={1}
          data={images}
          renderItem={renderItem}
          rowGap={10}
        />
        <Pressable
          onPress={openSheet}
          className="bg-surface items-center flex-row justify-between border-warning border-dashed gap-3 rounded-2xl p-4 border"
        >
          <View className="flex-row items-center gap-3">
            <View className="size-8 rounded-xl items-center justify-center bg-warning">
              <StyledSymbolView
                name={{ android: "upload", ios: "square.and.arrow.up" }}
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
      </View>
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

export default ManageItemImageScreen;
