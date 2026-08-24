import { RecommendedItems } from "@/types";
import { getAvatarName } from "@/utils/avatar-name";
import { Link } from "expo-router";
import { memo } from "react";
import { TouchableOpacity, View } from "react-native";
import { Avatar } from "../ui/avatar";
import { Card } from "../ui/card";
import { ThemedText } from "../ui/themed-text";
import { RecommendedItemSwitch } from "./recommended-item-switch";

export const RecommendedItemCard = memo(
  ({ item }: { item: RecommendedItems }) => {
    return (
      <Link
        asChild
        href={{
          pathname: "/item/[itemId]",
          params: {
            itemId: item.itemId?.toString() || "",
          },
        }}
      >
        <TouchableOpacity>
          <Card className="flex-row items-center gap-3">
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
        </TouchableOpacity>
      </Link>
    );
  },
);
