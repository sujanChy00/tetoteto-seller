import { orderStatusTextColor } from "@/utils/order-status";
import { useLocalSearchParams, useRouter } from "expo-router";
import { memo } from "react";
import { Pressable, View } from "react-native";
import { FadeIn, FadeOut } from "react-native-reanimated";
import { twMerge } from "tailwind-merge";
import { AnimatedView } from "../ui/animated-view";
import { ThemedText } from "../ui/themed-text";

export const OrderFilterResultText = memo(
  ({ totalItems }: { totalItems: number }) => {
    const router = useRouter();
    const { endDate, orderStatus, startDate } = useLocalSearchParams<{
      orderStatus: string;
      startDate: string;
      endDate: string;
    }>();

    const handleClear = () => {
      router.setParams({
        orderStatus: undefined,
        startDate: undefined,
        endDate: undefined,
      });
    };

    if (!!endDate || !!startDate || (!!orderStatus && orderStatus != "all"))
      return (
        <AnimatedView
          entering={FadeIn}
          exiting={FadeOut}
          className="flex-row items-end pt-3 pb-6 justify-between gap-3"
        >
          <View className="flex-1 gap-0.5">
            <ThemedText className="text-xs text-muted flex-1">
              Found{" "}
              <ThemedText
                className={twMerge(
                  "font-semibold",
                  orderStatusTextColor[orderStatus],
                )}
              >
                {totalItems}{" "}
                {orderStatus ? `${orderStatus?.replaceAll("_", " ")} ` : null}
              </ThemedText>
              orders
            </ThemedText>
            {!!endDate && !!startDate && (
              <ThemedText className="text-muted text-xs flex-1">
                Showing results from{" "}
                <ThemedText className="text-foreground font-medium">
                  {startDate}
                </ThemedText>
                /
                <ThemedText className="text-foreground font-medium">
                  {endDate}
                </ThemedText>
              </ThemedText>
            )}
          </View>
          <Pressable onPress={handleClear} hitSlop={8}>
            <ThemedText className="text-xs text-primary font-medium">
              Clear
            </ThemedText>
          </Pressable>
        </AnimatedView>
      );

    return null;
  },
);
