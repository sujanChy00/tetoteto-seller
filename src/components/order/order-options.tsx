import MORE_HORIZ_ICON from "@expo/material-symbols/more_horiz.xml";
import { Icon } from "@expo/ui";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";

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
  getInvoice: () => void;
}

export const OrderOptions = ({
  userId,
  canUpdateAddress,
  isWaitingPayment,
  getInvoice,
}: Props) => {
  const router = useRouter();
  const { orderId } = useLocalSearchParams<{ orderId: string }>();

  return (
    <Stack.Toolbar.Menu>
      <Stack.Toolbar.Icon sf="ellipsis.circle" src={MORE_HORIZ_ICON} />
      <Stack.Toolbar.MenuAction
        icon={USER_ORDERS_ICON}
        onPress={() => {
          router.push({
            pathname: "/user-orders/[userId]",
            params: {
              userId,
            },
          });
        }}
      >
        User Orders
      </Stack.Toolbar.MenuAction>
      {canUpdateAddress && (
        <Stack.Toolbar.MenuAction
          icon={UPDATE_ADDRESS_ICON}
          onPress={() => {
            router.push({
              pathname: "/order/[orderId]/update-address",
              params: {
                orderId,
              },
            });
          }}
        >
          Update Address
        </Stack.Toolbar.MenuAction>
      )}
      <Stack.Toolbar.MenuAction
        icon={MESSAGE_USER_ICON}
        onPress={() => {
          router.push({
            pathname: "/message/[userId]",
            params: {
              userId,
              orderId,
            },
          });
        }}
      >
        Message User
      </Stack.Toolbar.MenuAction>
      {!isWaitingPayment && (
        <Stack.Toolbar.MenuAction
          icon={VIEW_INVOICE_ICON}
          onPress={() => {
            getInvoice();
          }}
        >
          View Invoice
        </Stack.Toolbar.MenuAction>
      )}
    </Stack.Toolbar.Menu>
  );
};
