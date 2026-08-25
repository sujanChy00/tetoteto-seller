import { RecommendedItems } from "@/types";
import { getAvatarName } from "@/utils/avatar-name";
import { Link, useRouter } from "expo-router";
import { memo } from "react";
import { View } from "react-native";
import { Avatar } from "../ui/avatar";
import { Card } from "../ui/card";
import { ThemedText } from "../ui/themed-text";
import { RecommendedItemSwitch } from "./recommended-item-switch";

export const RecommendedItemCard = memo(
  ({ item }: { item: RecommendedItems }) => {
    const router = useRouter();
    return (
      <Link
        href={{
          pathname: "/item/[itemId]",
          params: {
            itemId: item.itemId?.toString() || "",
          },
        }}
      >
        <Link.Trigger>
          <Card className="flex-row items-center gap-3 py-1">
            <Avatar className="size-16 rounded-xl">
              <Avatar.Image
                className="size-16 rounded-xl"
                source={item.itemPhotoUrl}
                alt={item.itemName}
              />
              <Avatar.Fallback source={item.itemPhotoUrl}>
                {getAvatarName(item.itemName)}
              </Avatar.Fallback>
            </Avatar>
            <Card.Header className="flex-1">
              <Card.Title className="flex-1 text-base" numberOfLines={1}>
                {item.itemName}
              </Card.Title>
              <ThemedText className="text-[15px] font-semibold text-primary">
                ¥{item.beforeTaxPrice?.toLocaleString()}
              </ThemedText>
              <View className="flex-row items-center gap-3 justify-between">
                <Card.Description className="text-xs">
                  {item.itemPrice?.toLocaleString()} (with tax)
                </Card.Description>
                <RecommendedItemSwitch
                  itemId={item.itemId?.toString() || ""}
                  recommended={true}
                />
              </View>
            </Card.Header>
          </Card>
        </Link.Trigger>
        <Link.Menu>
          <Link.MenuAction
            icon="pencil"
            onPress={() => {
              router.push({
                pathname: "/item/[itemId]/edit",
                params: {
                  itemId: item.itemId ?? "",
                },
              });
            }}
          >
            <ThemedText>Edit</ThemedText>
          </Link.MenuAction>
          <Link.MenuAction
            icon="square.fill.on.square"
            onPress={() => {
              router.push({
                pathname: "/item/[itemId]/copy",
                params: {
                  itemId: item.itemId ?? "",
                },
              });
            }}
          >
            <ThemedText>Copy</ThemedText>
          </Link.MenuAction>
          <Link.MenuAction
            icon="square.stack.3d.up.fill"
            onPress={() => {
              router.push({
                pathname: "/item/[itemId]/variation",
                params: {
                  itemId: item.itemId ?? "",
                },
              });
            }}
          >
            <ThemedText>Variations</ThemedText>
          </Link.MenuAction>
          <Link.MenuAction
            icon="photo.fill.on.rectangle.fill"
            onPress={() => {
              router.push({
                pathname: "/item/[itemId]/manage-image",
                params: {
                  itemId: item.itemId ?? "",
                },
              });
            }}
          >
            <ThemedText>Manage Image</ThemedText>
          </Link.MenuAction>
        </Link.Menu>
      </Link>
    );
  },
);
