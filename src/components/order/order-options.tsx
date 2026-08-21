import { useGenerateInvoice } from "@/queries/order-query";
import { Icon } from "@expo/ui";
import { GlassView } from "expo-glass-effect";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useMemo } from "react";
import { Platform, StyleSheet, View } from "react-native";
import { FullScreenSpinner } from "../ui/full-screen-spinner";
import { Menu } from "../ui/menu";
import { StyledSymbolView } from "../ui/symbol-view";
import { ThemedText } from "../ui/themed-text";

const styles = StyleSheet.create({
  container: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
});

const Trigger = Platform.select({
  ios: (
    <GlassView style={styles.container} hitSlop={20}>
      <StyledSymbolView
        tintColorClassName="accent-foreground"
        name={{
          android: "more_horiz",
          ios: "ellipsis",
        }}
      />
    </GlassView>
  ),
  android: (
    <View
      hitSlop={20}
      className="size-8 rounded-full items-center justify-center"
    >
      <StyledSymbolView
        tintColorClassName="accent-foreground"
        name={{
          android: "more_horiz",
          ios: "ellipsis",
        }}
      />
    </View>
  ),
});

const USER_ORDERS_ICON = Icon.select({
  ios: "bag",
  android: import("@expo/material-symbols/shopping_bag.xml"),
});

const UPDATE_ADDRESS_ICON = Icon.select({
  ios: "mappin.and.ellipse",
  android: import("@expo/material-symbols/location_on.xml"),
});

const MESSAGE_USER_ICON = Icon.select({
  ios: "message",
  android: import("@expo/material-symbols/chat.xml"),
});

const VIEW_INVOICE_ICON = Icon.select({
  ios: "doc.text",
  android: import("@expo/material-symbols/description.xml"),
});

interface Props {
  userId: string;
  canUpdateAddress: boolean;
  isWaitingPayment: boolean;
}

export const OrderOptions = ({
  userId,
  canUpdateAddress,
  isWaitingPayment,
}: Props) => {
  const router = useRouter();
  const { orderId } = useLocalSearchParams<{ orderId: string }>();
  const { getInvoice, isLoading } = useGenerateInvoice(Number(orderId));

  const options = useMemo(
    () => [
      {
        title: "User Orders",
        id: "user-orders",
        image: USER_ORDERS_ICON,
      },
      ...(canUpdateAddress
        ? [
            {
              title: "Update Address",
              id: "update-address",
              image: UPDATE_ADDRESS_ICON,
            },
          ]
        : []),
      {
        title: "Message User",
        id: "message-user",
        image: MESSAGE_USER_ICON,
      },
      ...(!isWaitingPayment
        ? [
            {
              title: "View Invoice",
              id: "view-invoice",
              image: VIEW_INVOICE_ICON,
            },
          ]
        : []),
    ],
    [canUpdateAddress, isWaitingPayment],
  );

  const handleValueChange = (value: string) => {
    switch (value) {
      case "user-orders":
        router.push({
          pathname: "/user-orders/[userId]",
          params: {
            userId,
          },
        });
        break;
      case "update-address":
        router.push({
          pathname: "/order/[orderId]/update-address",
          params: {
            orderId,
          },
        });
        break;
      case "message-user":
        router.push({
          pathname: "/message/[userId]",
          params: {
            userId,
            orderId,
          },
        });
        break;
      case "view-invoice":
        getInvoice();
        break;
    }
  };

  return (
    <>
      <FullScreenSpinner
        isVisible={isLoading}
        loadingText={
          <View className="items-center">
            <ThemedText className="text-center text-base">
              Please wait...
            </ThemedText>
            <ThemedText className="text-center text-muted">
              Invoice is being generated...
            </ThemedText>
          </View>
        }
      />
      <Menu onValueChange={handleValueChange} nativeOptions={options}>
        {Trigger}
      </Menu>
    </>
  );
};
