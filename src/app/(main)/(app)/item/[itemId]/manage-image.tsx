import { ItemDraggableImage } from "@/components/item/item-draggable-image";
import { ItemCurrentThumbnail } from "@/components/item/manage-images/item-current-thumbnail";
import { ItemThumbnailsPicker } from "@/components/item/manage-images/item-thumbnails-picker";
import { ManageItemThumbnailTitle } from "@/components/item/manage-images/manage-item-thumbnail-title";
import { ThumbnailLoadingSkeleton } from "@/components/item/manage-images/thumbnail-loading-skeleton";
import { PendingComponent } from "@/components/layout/pending-component";
import { PrimaryButton } from "@/components/ui/button";
import { useItemThumbnail } from "@/hooks/use-item-thumbnail";
import { useCallback } from "react";
import { ActivityIndicator, View } from "react-native";
import Animated from "react-native-reanimated";
import type { SortableGridRenderItem } from "react-native-sortables";
import Sortable from "react-native-sortables";

const ManageItemImageScreen = () => {
  const {
    isDisabled,
    currentThumbnail,
    onDeleteImage,
    setCurrentThumbnail,
    isDataLoading,
    scrollableRef,
    images,
    addImageMutation,
    itemId,
    updateImage,
    updatingImages,
    setNumberOfImageSelected,
    numberOfImageSelected,
    addingImages,
    onDragEnd,
    warningColor,
  } = useItemThumbnail();
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

  if (isDataLoading) return <PendingComponent />;
  return (
    <View className="flex-1">
      <Animated.ScrollView
        ref={scrollableRef}
        contentInsetAdjustmentBehavior="automatic"
        showsVerticalScrollIndicator={false}
      >
        <View className="pt-safe-offset-20 gap-y-10 px-4">
          <ManageItemThumbnailTitle images={images} />
          <View className="gap-y-4">
            <ItemCurrentThumbnail currentThumbnail={currentThumbnail} />
            {images.length > 0 ? (
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
            ) : null}
            <ThumbnailLoadingSkeleton
              addingImage={addingImages}
              numberOfImageSelected={numberOfImageSelected}
            />
            <ItemThumbnailsPicker
              disabled={isDisabled}
              itemId={itemId}
              images={images}
              setNumberOfImageSelected={setNumberOfImageSelected}
              onImageChange={async (uris) => {
                addImageMutation({
                  images: uris,
                  itemId,
                });
              }}
            />
          </View>
        </View>
        <View className="h-40" />
      </Animated.ScrollView>
      <View className="absolute bottom-safe-offset-6 w-full px-4">
        <PrimaryButton onPress={updateImage} disabled={isDisabled}>
          {updatingImages && (
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
