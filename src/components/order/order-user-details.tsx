import { ITransactionById } from "@/types";
import { getAvatarName } from "@/utils/avatar-name";
import { View } from "react-native";
import { Avatar } from "../ui/avatar";
import { Card } from "../ui/card";
import { Separator } from "../ui/separator";
import { StyledSymbolView } from "../ui/symbol-view";
import { ThemedText } from "../ui/themed-text";

export const OrderUserDetails = ({ order }: { order: ITransactionById }) => {
  return (
    <Card className="gap-3">
      <Card.Header className="flex-row items-center gap-3">
        <Avatar>
          <Avatar.Fallback source="">
            {getAvatarName(order.userDetail.name)}
          </Avatar.Fallback>
        </Avatar>
        <View className="gap-0.5">
          <Card.Title className="flex-1 text-lg" numberOfLines={1}>
            {order.userDetail.name}
          </Card.Title>
          <View className="flex-row items-center gap-1">
            <StyledSymbolView
              name={{
                android: "phone",
                ios: "phone.fill",
              }}
              size={12}
              tintColorClassName={"accent-muted"}
            />
            <Card.Description className="text-xs font-medium">
              {order.userDetail.phoneNumber}
            </Card.Description>
          </View>
        </View>
      </Card.Header>
      <Separator />
      <Card.Body className="gap-0.5">
        <ThemedText className="font-medium text-muted text-[13px]">
          TetoTeto Orders (success): {order.previousOrderStatus.total}{" "}
          <ThemedText className="text-success">
            ({order.previousOrderStatus.success})
          </ThemedText>
        </ThemedText>
        <ThemedText className="font-medium text-muted text-[13px]">
          {order.shopDetail.name} (success):{" "}
          {order.previousOrderStatus.thisShop}{" "}
          <ThemedText className="text-success">
            ({order.previousOrderStatus.thisShopSuccess})
          </ThemedText>
        </ThemedText>
      </Card.Body>
    </Card>
  );
};
