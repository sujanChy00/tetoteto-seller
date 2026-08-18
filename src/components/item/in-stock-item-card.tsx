import { IStockItem } from "@/types";
import { getAvatarName } from "@/utils/avatar-name";
import { Link } from "expo-router";
import { memo } from "react";
import { Pressable, View } from "react-native";
import { twMerge } from "tailwind-merge";
import { Avatar } from "../ui/avatar";
import { Card } from "../ui/card";
import { Chip } from "../ui/chip";
import { Indicator } from "../ui/indicator";
import { Separator } from "../ui/separator";
import { ThemedText } from "../ui/themed-text";
import { ItemStockUpdateDialog } from "./item-stock-updater-dialog";

export const InStockItemCard = memo(({ item }: { item: IStockItem }) => {
  return (
    <Link
      href={{
        pathname: "/item/[itemId]",
        params: {
          itemId: item.id,
        },
      }}
      asChild
    >
      <Pressable>
        <Card className="gap-3">
          <View className="flex-row items-center gap-3">
            <Avatar className="rounded-xl size-16">
              <Avatar.Image
                alt={item.name}
                source={item.thumbnailImage || ""}
              />
              <Avatar.Fallback source={item.thumbnailImage || ""}>
                {getAvatarName(item.name)}
              </Avatar.Fallback>
            </Avatar>
            <Card.Body className="flex-1">
              <View className="flex-1">
                <View className="flex-row items-center gap-1">
                  <Indicator
                    variant={item.stock <= 10 ? "warning" : "success"}
                  />
                  <ThemedText
                    className={twMerge(
                      "text-[9px] font-medium uppercase",
                      item.stock <= 10 ? "text-warning" : "text-success",
                    )}
                  >
                    {item.stock <= 10 ? "low stock" : "in stock"}
                  </ThemedText>
                </View>
                <Card.Title className="flex-1" numberOfLines={1}>
                  {item.name}
                </Card.Title>
              </View>
              <ThemedText className="font-medium text-muted">
                Current Stock:{" "}
                <ThemedText
                  className={twMerge(
                    "font-semibold text-lg",
                    item.stock <= 10 ? "text-warning" : "text-foreground",
                  )}
                >
                  {item.stock}
                </ThemedText>
              </ThemedText>
            </Card.Body>
          </View>
          <Separator />
          <Card.Footer className="gap-3">
            {item.sharedItems.length > 0 && (
              <>
                <View className="flex-row items-center gap-3">
                  <ThemedText className="text-muted">
                    Related Items:{" "}
                  </ThemedText>
                  <View className="flex-row items-center gap-2 flex-wrap flex-1">
                    {[0, 1, 2, 3, 4, 5].map((id, index) => (
                      <Link
                        asChild
                        key={index}
                        href={{
                          pathname: "/item/[itemId]",
                          params: { itemId: "id" },
                        }}
                      >
                        <Chip size="sm" variant="soft">
                          <Chip.Label>{"idaljngls"}</Chip.Label>
                        </Chip>
                      </Link>
                    ))}
                  </View>
                </View>
                <Separator />
              </>
            )}
            <ItemStockUpdateDialog
              stock={item.stock}
              itemId={item.id}
              itemName={item.name}
            />
          </Card.Footer>
        </Card>
      </Pressable>
    </Link>
  );
});
