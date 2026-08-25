import { ItemDraggableImage } from "@/components/item/item-draggable-image";
import { PendingComponent } from "@/components/layout/pending-component";
import { AnimatedView } from "@/components/ui/animated-view";
import { PrimaryButton, SecondaryButton } from "@/components/ui/button";
import { FalllBackMesage } from "@/components/ui/fallback-message";
import { StyledImage } from "@/components/ui/image";
import { Skeleton } from "@/components/ui/skeleton";
import { StyledSymbolView } from "@/components/ui/symbol-view";
import { ThemedText } from "@/components/ui/themed-text";
import { useLanguage } from "@/hooks/use-language";
import { useRefreshOnFocus } from "@/hooks/use-refetch-onfocus";
import {
  useAddItemImages,
  useUpdateItemImages,
} from "@/mutation/item-mutation";
import { useGetItemDetail } from "@/queries/item-query";
import { errorToast } from "@/utils/toast";
import {
  BottomSheetModal,
  BottomSheetView,
} from "@expo/ui/community/bottom-sheet";
import * as ImagePicker from "expo-image-picker";
import { Link, useLocalSearchParams } from "expo-router";
import { useCallback, useRef, useState } from "react";
import { ActivityIndicator, Pressable, View } from "react-native";
import Animated, {
  useAnimatedRef,
  ZoomIn,
  ZoomOut,
} from "react-native-reanimated";
import type {
  SortableGridDragEndCallback,
  SortableGridRenderItem,
} from "react-native-sortables";
import Sortable from "react-native-sortables";
import { useCSSVariable } from "uniwind";

const ManageItemImageScreen = () => {
  const removedImagesRef = useRef<string[]>([]);
  const { t } = useLanguage();
  const scrollableRef = useAnimatedRef<Animated.ScrollView>();
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const [warningColor] = useCSSVariable(["--color-warning"]) as [string];
  const { itemId } = useLocalSearchParams<{ itemId: string }>();
  const { data, isPending, refetch } = useGetItemDetail(itemId);
  const [currentThumbnail, setCurrentThumbnail] = useState(
    data?.itemImages.thumbnailImage ?? "",
  );
  const [numberOfImageSelected, setNumberOfImageSelected] = useState(0);
  useRefreshOnFocus(refetch);
  const [images, setImages] = useState<string[]>(
    data?.itemImages?.images ?? [],
  );
  const { mutateAsync: addImageMutation, isPending: addingImage } =
    useAddItemImages({
      onSuccess: ({ images: newImages }) => {
        setImages(
          newImages.filter((img) => !removedImagesRef.current.includes(img)),
        );
      },
    });

  const { mutateAsync: updateImageMutation, isPending: updating } =
    useUpdateItemImages({
      onSuccess: ({ images, thumbnailImage }) => {
        removedImagesRef.current = [];
        setImages(images);
        setCurrentThumbnail(thumbnailImage);
      },
    });

  const onDeleteImage = useCallback((item: string) => {
    removedImagesRef.current = [...removedImagesRef.current, item];
    setImages((prev) => prev.filter((img) => img !== item));
  }, []);

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
      selectionLimit: 4 - images.length,
    });

    if (result.canceled || result.assets.length === 0) return;
    const uris = result.assets.map((a) => a.uri as string);
    setNumberOfImageSelected(uris.length);
    closeSheet();
    await addImageMutation({ images: uris, itemId });
  }, [closeSheet, images, itemId]);

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
    await addImageMutation({ images: uris, itemId });
  }, [closeSheet, itemId]);

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

  const onDragEnd = useCallback<SortableGridDragEndCallback<string>>(
    ({ data }) => {
      setImages(data);
    },
    [],
  );

  const updateImage = useCallback(async () => {
    const exists = images.find((img) => img === currentThumbnail);
    if (!exists) {
      errorToast({
        title: t("error"),
        description: t("thumbnail_error_message"),
      });

      return;
    }
    await updateImageMutation({
      images,
      itemId,
      thumbnailImage: currentThumbnail ?? images[0],
    });
  }, [images, currentThumbnail, itemId]);

  if (isPending) return <PendingComponent />;
  if (!data) return <FalllBackMesage />;
  return (
    <View className="flex-1">
      <Animated.ScrollView
        ref={scrollableRef}
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}
      >
        <View className="pt-safe-offset-20 gap-y-10 px-4">
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
            {currentThumbnail && (
              <Link
                className="w-full"
                href={{
                  pathname: "/image/[image]",
                  params: {
                    image: currentThumbnail,
                  },
                }}
              >
                <StyledImage
                  source={currentThumbnail}
                  alt={"current-thumbnail"}
                  className="h-40 w-full"
                  contentFit="contain"
                />
              </Link>
            )}
            <Sortable.Grid
              sortEnabled={true}
              showDropIndicator
              dropIndicatorStyle={{
                borderColor: warningColor,
              }}
              enableActiveItemSnap
              hapticsEnabled
              scrollableRef={scrollableRef}
              columns={1}
              onDragEnd={onDragEnd}
              data={images}
              renderItem={renderItem}
              rowGap={10}
            />
            {addingImage &&
              Array.from({ length: numberOfImageSelected }).map((_, i) => (
                <Skeleton className={"rounded-2xl h-20"} key={i} />
              ))}
            <View className="gap-y-1">
              {images.length < 4 && (
                <AnimatedView entering={ZoomIn} exiting={ZoomOut}>
                  <Pressable
                    disabled={addingImage || updating}
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
            </View>
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
        <View className="h-40" />
      </Animated.ScrollView>
      <View className="absolute bottom-safe-offset-6 w-full px-4">
        <PrimaryButton onPress={updateImage} disabled={addingImage || updating}>
          {updating && (
            <ActivityIndicator
              colorClassName="accent-primary-foreground"
              size={"small"}
            />
          )}
          <PrimaryButton.Label>Update</PrimaryButton.Label>
        </PrimaryButton>
      </View>
    </View>
  );
};

export default ManageItemImageScreen;
