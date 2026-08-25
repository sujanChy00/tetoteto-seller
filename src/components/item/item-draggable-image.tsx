import { memo } from "react";
import { View } from "react-native";
import { twMerge } from "tailwind-merge";
import { SecondaryButton } from "../ui/button";
import { StyledImage } from "../ui/image";
import { Surface } from "../ui/surface";
import { StyledSymbolView } from "../ui/symbol-view";
import { ThemedText } from "../ui/themed-text";

interface Props {
  thumbnail?: string;
  index: number;
  item: string;
  onThumbnailChange: (thumbnail: string) => void;
  onDeleteImage: (images: string) => void;
}

export const ItemDraggableImage = memo(
  ({ thumbnail, index, item, onThumbnailChange, onDeleteImage }: Props) => {
    return (
      <Surface
        className={twMerge(
          "flex-row items-center gap-3 justify-between border shadow-none p-2 rounded-2xl",
          thumbnail == item
            ? "border-primary bg-primary-soft"
            : "border-border",
        )}
      >
        <View className="flex-row items-center flex-1 gap-2">
          <View
            className={twMerge(
              "border rounded-full size-6 items-center justify-center",
              thumbnail === item ? "border-primary" : "border-border",
            )}
          >
            <ThemedText
              className={
                thumbnail === item ? "text-primary" : "text-foreground"
              }
            >
              {index + 1}
            </ThemedText>
          </View>
          <StyledSymbolView
            name={{
              android: "drag_indicator",
              ios: "line.3.horizontal",
            }}
            tintColorClassName="accent-muted"
          />
          <StyledImage
            source={item}
            alt={item}
            className="size-14 rounded-xl"
          />
        </View>
        <View className="flex-row items-center gap-3">
          <SecondaryButton
            onPress={() => {
              onThumbnailChange(item);
            }}
            className={twMerge(
              "px-0 h-8 w-8 gap-0 rounded-xl",
              thumbnail === item ? "bg-primary/20" : "",
            )}
          >
            <StyledSymbolView
              name={{
                android: "star",
                ios: "star",
              }}
              size={16}
              tintColorClassName="accent-muted"
            />
          </SecondaryButton>
          <SecondaryButton
            onPress={() => {
              onDeleteImage(item);
            }}
            className="px-0 h-8 w-8 gap-0 rounded-xl"
          >
            <StyledSymbolView
              name={{
                android: "delete",
                ios: "trash",
              }}
              size={16}
              tintColorClassName="accent-muted"
            />
          </SecondaryButton>
        </View>
      </Surface>
    );
  },
);
