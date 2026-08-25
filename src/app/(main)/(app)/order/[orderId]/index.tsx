import { PendingComponent } from "@/components/layout/pending-component";
import { OrderChangedConfirmationDialog } from "@/components/order/order-changed-confirmation-dialog";
import { OrderDeliveryAddress } from "@/components/order/order-delivery-address";
import { OrderDeliveryDetails } from "@/components/order/order-delivery-details";
import { OrderDetailsTitle } from "@/components/order/order-details-title";
import { OrderNote } from "@/components/order/order-note";
import { OrderOptions } from "@/components/order/order-options";
import { OrderPaymentInfo } from "@/components/order/order-payment-info";
import { OrderReviews } from "@/components/order/order-review";
import { OrderUserDetails } from "@/components/order/order-user-details";
import { OrderedItems } from "@/components/order/ordered-items";
import { TrackOrderButton } from "@/components/order/track-order-button";
import { UpdateOrderTrackingInfo } from "@/components/order/update-order-tracking-info";
import { AnimatedView } from "@/components/ui/animated-view";
import { FalllBackMesage } from "@/components/ui/fallback-message";
import { FullScreenSpinner } from "@/components/ui/full-screen-spinner";
import { ThemedText } from "@/components/ui/themed-text";
import { UpdateAddressAlert } from "@/components/ui/update-address-alert";
import { useOrder } from "@/hooks/use-order";
import { useGenerateInvoice, useGetOrderById } from "@/queries/order-query";
import { Stack, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { RefreshControl, ScrollView, View } from "react-native";
import { SlideInDown } from "react-native-reanimated";

const OrderDetailScreen = () => {
  const [refreshing, setRefreshing] = useState(false);
  const { orderId } = useLocalSearchParams<{ orderId: string }>();
  const { getInvoice, isLoading } = useGenerateInvoice(Number(orderId));
  const {
    data: order,
    isPending,
    refetch,
    error,
  } = useGetOrderById({
    id: Number(orderId || ""),
  });

  const {
    canApproveAddressUpdate,
    canShipOrder,
    canUpdateAddress,
    isOrderChanged,
    showUserReviews,
    trackingDetailsAvailable,
  } = useOrder({ order });

  if (isPending)
    return (
      <>
        <PendingComponent />
        <Stack.Title>Loading...</Stack.Title>
      </>
    );

  if (!order)
    return (
      <>
        <FalllBackMesage message={error.message || "Item not found"} />
        <Stack.Title>!Oops</Stack.Title>
      </>
    );

  const showOrderActions =
    isOrderChanged || trackingDetailsAvailable || canShipOrder;

  const isWaitingPayment = order.orderStatus === "WAIT_PAYMENT";

  return (
    <View className="flex-1">
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
      <Stack.Title>#{order.transactionId}</Stack.Title>
      <Stack.Toolbar placement="right">
        <OrderOptions
          getInvoice={getInvoice}
          isWaitingPayment={isWaitingPayment}
          canUpdateAddress={canUpdateAddress}
          userId={String(order.userDetail.id)}
        />
      </Stack.Toolbar>
      <ScrollView
        contentContainerClassName="p-2 pt-6"
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              setRefreshing(true);
              refetch().finally(() => setRefreshing(false));
            }}
          />
        }
        showsVerticalScrollIndicator={false}
      >
        <View className="gap-6">
          {canApproveAddressUpdate && (
            <UpdateAddressAlert
              isSellerRequest={
                order.updateAddressRequest?.sellerRequest || false
              }
              orderId={Number(orderId || "")}
            />
          )}
          <OrderDetailsTitle order={order} />
          <OrderUserDetails order={order} />
          <OrderDeliveryDetails order={order} />
          <OrderDeliveryAddress order={order} />
          <OrderNote note={order.note} />
          <OrderedItems order={order} />
          <OrderPaymentInfo order={order} />
          {showUserReviews && <OrderReviews order={order} />}
        </View>
        <View className="h-28" />
      </ScrollView>
      {showOrderActions && (
        <AnimatedView
          entering={SlideInDown.duration(400)}
          className="flex-row items-center justify-between gap-3 absolute bottom-0 p-3 pb-safe-offset-6 left-0 w-full bg-background border-t-hairline border-t-separator"
        >
          {isOrderChanged && (
            <OrderChangedConfirmationDialog orderStatus={order.orderProgress} />
          )}
          {trackingDetailsAvailable && <TrackOrderButton />}
          {canShipOrder && <UpdateOrderTrackingInfo order={order} />}
        </AnimatedView>
      )}
    </View>
  );
};

export default OrderDetailScreen;
