import { ITransactionById } from "@/types";
import * as Clipboard from "expo-clipboard";
import { useMemo } from "react";
import { Linking, View } from "react-native";
import { GhostButton } from "../ui/button";
import { Card } from "../ui/card";
import { StyledSymbolView } from "../ui/symbol-view";
import { ThemedText } from "../ui/themed-text";

export const OrderReviews = ({ order }: { order: ITransactionById }) => {
  const ratings = useMemo(
    () => Array.from({ length: order.userReview.rating }),
    [order.userReview.rating],
  );

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(order.trackingNumber);
  };
  return (
    <Card className="gap-3">
      {!!order.trackingUrl && (
        <View className="flex-row items-center justify-between gap-3">
          <ThemedText className="font-semibold">Tracking URL </ThemedText>
          <GhostButton
            onPress={() => {
              Linking.openURL(order.trackingUrl);
            }}
          >
            <GhostButton.Label className="text-primary">view</GhostButton.Label>
            <StyledSymbolView
              name={{
                android: "open_in_new",
                ios: "arrow.up.right.square",
              }}
              size={18}
              tintColorClassName={"accent-primary"}
            />
          </GhostButton>
        </View>
      )}
      {!!order.trackingNumber && (
        <View className="flex-row items-center justify-between gap-3 bg-surface-secondary p-2 rounded-xl">
          <View className="gap-1">
            <ThemedText className="text-muted text-xs">
              Tracking Number
            </ThemedText>
            <ThemedText className="font-semibold text-primary">
              {order.trackingNumber}
            </ThemedText>
          </View>
          <GhostButton onPress={copyToClipboard}>
            <StyledSymbolView
              name={{
                android: "content_copy",
                ios: "doc.on.doc",
              }}
              size={18}
              tintColorClassName={"accent-primary"}
            />
          </GhostButton>
        </View>
      )}
      {ratings.length > 0 && (
        <View className="flex-row items-center gap-1 pt-2">
          {ratings.map((_, index) => (
            <StyledSymbolView
              key={index}
              name={{
                android: "star",
                ios: "star.fill",
              }}
              size={18}
              tintColorClassName={"accent-warning"}
            />
          ))}
        </View>
      )}
      {!!order.userReview.review && (
        <View className="bg-surface-secondary p-2 rounded-xl">
          <ThemedText className="text-muted italic text-xs">
            “{order.userReview.review}
          </ThemedText>
        </View>
      )}
    </Card>
  );
};
