import { ILowStockItem } from "@/types";
import { getAvatarName } from "@/utils/avatar-name";
import { Link } from "expo-router";
import { memo } from "react";
import { View } from "react-native";
import { Avatar } from "../ui/avatar";
import { Card } from "../ui/card";
import { Chip } from "../ui/chip";
import { ThemedText } from "../ui/themed-text";
import { ItemStockUpdateDialog } from "./item-stock-updater-dialog";

export const LowStockItemCard = memo(({ item }: { item: ILowStockItem }) => (
  <Card className="gap-3">
    <Link
      href={{
        pathname: "/item/[itemId]",
        params: {
          itemId: item.itemId,
        },
      }}
    >
      <View className="gap-3 flex-row items-center">
        <Avatar className="rounded-xl size-16">
          <Avatar.Image source={item.thumbnailImage} alt={item.itemName} />
          <Avatar.Fallback source={item.thumbnailImage}>
            <ThemedText>{getAvatarName(item.itemName)}</ThemedText>
          </Avatar.Fallback>
        </Avatar>
        <View className="flex-1">
          <Card.Title className="flex-1" numberOfLines={1}>
            {item.itemName}
          </Card.Title>
          <Card.Body>
            <ThemedText className="text-muted uppercase text-xs font-medium">
              STOCK:{" "}
              <ThemedText className="font-semibold text-danger">
                {item.itemStock}
              </ThemedText>
            </ThemedText>
            <View className="flex-row items-center gap-3 justify-between">
              <ThemedText className="text-muted uppercase text-xs font-medium">
                EXPIRES:{" "}
                <ThemedText className="font-semibold text-danger">
                  {item.itemExpiryDateString}
                </ThemedText>
              </ThemedText>
              <Chip
                size="sm"
                variant="soft"
                color={item.itemDisabled ? "danger" : "success"}
              >
                <Chip.Label>
                  {item.itemDisabled ? "INACTIVE" : "ACTIVE"}
                </Chip.Label>
              </Chip>
            </View>
          </Card.Body>
        </View>
      </View>
    </Link>
    <Card.Footer>
      <ItemStockUpdateDialog
        stock={item.itemStock}
        itemId={item.itemId}
        itemName={item.itemName}
      />
    </Card.Footer>
  </Card>
));
