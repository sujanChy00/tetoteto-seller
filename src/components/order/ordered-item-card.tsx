import { useOrderPacking } from "@/context/order-packing-provider";
import { ITransactionByIdItems } from "@/types";
import { getAvatarName } from "@/utils/avatar-name";
import { useRouter } from "expo-router";
import { Pressable, View } from "react-native";
import { Avatar } from "../ui/avatar";
import { ThemedText } from "../ui/themed-text";
import { PackedOrderIndicator } from "./packed-order-indicator";

export const OrderdItemCard = ({ item }: { item: ITransactionByIdItems }) => {
  const router = useRouter();
  const { startPacking, openSheet, setPackedOrders, setOneItem } =
    useOrderPacking();
  return (
    <Pressable
      onPress={() => {
        if (!startPacking) {
          router.push({
            pathname: "/item/[itemId]",
            params: {
              itemId: item.id,
            },
          });
        } else {
          if (item.quantity > 1) {
            setOneItem(item);
            openSheet();
          } else {
            setPackedOrders({
              items: {
                itemId: String(item.id + item.weight),
                quantity: item.quantity,
              },
            });
          }
        }
      }}
      key={item.id}
      className="flex-row items-center gap-3"
    >
      <PackedOrderIndicator item={item} />
      <View className="flex-1 flex-row items-center gap-3">
        <Avatar>
          <Avatar.Image source={item.thumbnailImage} />
          <Avatar.Fallback source={item.thumbnailImage}>
            {getAvatarName(item.name)}
          </Avatar.Fallback>
        </Avatar>
        <View className="flex-1 pt-1.5 gap-1">
          <ThemedText className="flex-1 font-medium" numberOfLines={1}>
            {item.name}
          </ThemedText>
          <View className="gap-3 flex-row items-end justify-between">
            <ThemedText className="text-xs text-muted">
              {item.weight}
            </ThemedText>
            <View className="flex-row items-center gap-3">
              <ThemedText className="text-danger text-xs font-medium">
                X{item.quantity}
              </ThemedText>
              <ThemedText className="font-semibold text-xs">
                ¥{item.price}
              </ThemedText>
            </View>
          </View>
        </View>
      </View>
    </Pressable>
  );
};
