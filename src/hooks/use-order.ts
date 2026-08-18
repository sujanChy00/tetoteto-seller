import { ITransactionById } from "@/types";

export const useOrder = ({ order }: { order?: ITransactionById }) => {
  const canApproveAddressUpdate = order?.updateAddressRequest;
  const trackingDetailsAvailable =
    !!order?.trackingNumber || !!order?.trackingUrl;

  const canShipOrder =
    order?.orderProgress !== "COMPLETED" &&
    order?.orderProgress !== "CANCELLED_BY_ADMIN" &&
    order?.orderProgress !== "CANCELLED_BY_CUSTOMER" &&
    (order?.orderProgress === "SELLER_ACKNOWLEDGED" ||
      trackingDetailsAvailable);

  const canUpdateAddress =
    order?.orderStatus == "WAIT_PAYMENT" ||
    order?.orderStatus == "WAIT_SHIPPING" ||
    order?.orderStatus == "NOT_CONFIRMED";
  const isOrderChanged =
    order?.orderProgress == "ORDER_PLACED" ||
    order?.orderProgress == "SELLER_ACKNOWLEDGED";

  const showUserReviews =
    order?.orderProgress == "SHIPPED" ||
    order?.orderProgress == "COMPLETED" ||
    trackingDetailsAvailable;

  return {
    showUserReviews,
    canApproveAddressUpdate,
    canShipOrder,
    canUpdateAddress,
    isOrderChanged,
    trackingDetailsAvailable,
  };
};
