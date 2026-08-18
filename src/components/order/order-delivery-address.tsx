import { ITransactionById } from "@/types";
import { View } from "react-native";
import { Card } from "../ui/card";
import { ThemedText } from "../ui/themed-text";

export const OrderDeliveryAddress = ({
  order,
}: {
  order: ITransactionById;
}) => {
  return (
    <Card className="gap-6">
      <View className="gap-0.5">
        <ThemedText className="uppercase text-muted text-xs font-medium">
          Address 1
        </ThemedText>
        <ThemedText className="font-semibold">
          {" "}
          {order.userDetail.postalCode}, {order.userDetail.prefecture},
          {order.userDetail.city}, {order.userDetail.address1}
        </ThemedText>
      </View>
      <View className="gap-0.5">
        <ThemedText className="uppercase text-muted text-xs font-medium">
          Address 2
        </ThemedText>
        {!!order.userDetail.address2 ? (
          <ThemedText className="font-semibold">
            {order.userDetail.address2}
          </ThemedText>
        ) : (
          <ThemedText className="text-slate-500 italic text-xs">
            No secondary address provided
          </ThemedText>
        )}
      </View>
    </Card>
  );
};
