import { useDeleteItem } from "@/mutation/item-mutation";
import { IItem } from "@/types";
import { getAvatarName } from "@/utils/avatar-name";
import { Link, useRouter } from "expo-router";
import { memo } from "react";
import { View } from "react-native";
import { AlertDialog } from "../ui/alert-dialog";
import { Avatar } from "../ui/avatar";
import { Card } from "../ui/card";
import { Chip } from "../ui/chip";
import { ThemedText } from "../ui/themed-text";
import { RecommendedItemToggler } from "./recommended-item-toggler";

export const ItemCard = memo(({ item }: { item: IItem }) => {
  const router = useRouter();
  const { mutateAsync: deleteItem, isPending } = useDeleteItem();

  return (
    <Link
      href={{
        pathname: "/item/[itemId]",
        params: {
          itemId: item.item_id,
        },
      }}
    >
      <Link.Trigger>
        <Card.Root className="flex-row items-center gap-3">
          <Avatar.Root className="rounded-xl size-20">
            <Avatar.Image
              alt={item.item_name}
              className="rounded-xl size-20"
              source={item.thumbnail_image_url || ""}
            />
            <Avatar.Fallback source={item.thumbnail_image_url ?? ""}>
              <ThemedText>{getAvatarName(item.item_name)}</ThemedText>
            </Avatar.Fallback>
          </Avatar.Root>

          <View className="flex-1">
            <Card.Header className="flex-1">
              <View className="flex-1 flex-row items-center justify-between gap-3">
                <Card.Title className="flex-1" numberOfLines={1}>
                  {item.item_name}
                </Card.Title>
                <Chip
                  size="sm"
                  variant="soft"
                  color={item.item_disabled ? "danger" : "success"}
                >
                  <Chip.Label>
                    {item.item_disabled ? "INACTIVE" : "ACTIVE"}
                  </Chip.Label>
                </Chip>
              </View>
            </Card.Header>
            <Card.Body className="flex-row items-center gap-3">
              <ThemedText className="font-semibold text-danger text-sm">
                ¥{item.item_price_before_tax.toLocaleString()}{" "}
                <ThemedText className="line-through text-muted italic text-xs font-normal">
                  ¥{item.item_marked_price_before_tax.toLocaleString()}
                </ThemedText>
              </ThemedText>
              <ThemedText className="text-xs font-medium">
                {item.item_price.toLocaleString()} (with tax)
              </ThemedText>
            </Card.Body>

            <Card.Footer className="pt-3 flex-row items-center justify-between gap-3">
              <View className="flex-row items-center gap-1">
                <ThemedText className="font-semibold text-sm">
                  Stock:{" "}
                  <ThemedText
                    className={
                      item.item_stock <= 10 ? "text-danger" : "text-success"
                    }
                  >
                    {item.item_stock}
                  </ThemedText>
                </ThemedText>
              </View>
              <RecommendedItemToggler
                recommended={item.recommended}
                label="Recommended: "
                disabled={item.item_disabled}
                itemId={item.item_id}
              />
            </Card.Footer>
          </View>
        </Card.Root>
      </Link.Trigger>
      <Link.Menu>
        <Link.MenuAction
          icon="pencil"
          onPress={() => {
            router.push({
              pathname: "/item/[itemId]/edit",
              params: {
                itemId: item.item_id,
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
                itemId: item.item_id,
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
                itemId: item.item_id,
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
                itemId: item.item_id,
              },
            });
          }}
        >
          <ThemedText>Manage Image</ThemedText>
        </Link.MenuAction>
        <AlertDialog
          title={`Delete ${item.item_name}`}
          message="Are you sure you want to delete this item?"
          onConfirm={() => deleteItem(item.item_id)}
          isConfirming={isPending}
          trigger={(open) => (
            <Link.MenuAction icon="trash.fill" destructive onPress={open}>
              <ThemedText>Delete</ThemedText>
            </Link.MenuAction>
          )}
        />
      </Link.Menu>
    </Link>
  );
});
