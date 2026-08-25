import {
  useAddItemImages,
  useUpdateItemImages,
} from "@/mutation/item-mutation";
import { useGetItemDetail } from "@/queries/item-query";
import { errorToast } from "@/utils/toast";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useRef, useState } from "react";
import Animated, { useAnimatedRef } from "react-native-reanimated";
import { SortableGridDragEndCallback } from "react-native-sortables";
import { useCSSVariable } from "uniwind";
import { useLanguage } from "./use-language";
import { useRefreshOnFocus } from "./use-refetch-onfocus";

export const useItemThumbnail = () => {
  const router = useRouter();
  const [refreshing, setIsRefreshing] = useState(false);
  const removedImagesRef = useRef<string[]>([]);
  const { t } = useLanguage();
  const scrollableRef = useAnimatedRef<Animated.ScrollView>();
  const [warningColor] = useCSSVariable(["--color-warning"]) as [string];
  const { itemId } = useLocalSearchParams<{ itemId: string }>();
  const { data, isPending: isDataLoading, refetch } = useGetItemDetail(itemId);
  const [currentThumbnail, setCurrentThumbnail] = useState(
    data?.itemImages.thumbnailImage ?? "",
  );
  useRefreshOnFocus(refetch);
  const [numberOfImageSelected, setNumberOfImageSelected] = useState(0);
  const [images, setImages] = useState<string[]>(
    data?.itemImages?.images ?? [],
  );
  const { mutateAsync: addImageMutation, isPending: addingImages } =
    useAddItemImages({
      onSuccess: ({ images: newImages }) => {
        setImages(
          newImages.filter((img) => !removedImagesRef.current.includes(img)),
        );
      },
    });

  const { mutateAsync: updateImageMutation, isPending: updatingImages } =
    useUpdateItemImages({
      onSuccess: ({ images, thumbnailImage }) => {
        removedImagesRef.current = [];
        setImages(images);
        setCurrentThumbnail(thumbnailImage);
        router.back();
      },
    });

  const onDeleteImage = useCallback((item: string) => {
    removedImagesRef.current = [...removedImagesRef.current, item];
    setImages((prev) => prev.filter((img) => img !== item));
  }, []);

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

  const isDisabled = addingImages || updatingImages;

  return {
    isDisabled,
    currentThumbnail,
    onDeleteImage,
    setCurrentThumbnail,
    isDataLoading,
    scrollableRef,
    images,
    itemId,
    updatingImages,
    updateImage,
    addImageMutation,
    setNumberOfImageSelected,
    numberOfImageSelected,
    addingImages,
    onDragEnd,
    warningColor,
    refetch,
    refreshing,
    setIsRefreshing,
  };
};
