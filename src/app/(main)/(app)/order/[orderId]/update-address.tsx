import { OrderShippingAddressForm } from "@/components/form/order/order-shipping-address-form";
import { PendingComponent } from "@/components/layout/pending-component";
import { useRefreshOnFocus } from "@/hooks/use-refetch-onfocus";
import { useGetOrderById } from "@/queries/order-query";
import { useLocalSearchParams } from "expo-router";

const UpdateOrderAddressScreen = () => {
  const { orderId } = useLocalSearchParams<{ orderId: string }>();
  const { data, isPending, refetch } = useGetOrderById({ id: Number(orderId) });
  useRefreshOnFocus(refetch);
  if (isPending) return <PendingComponent />;
  return <OrderShippingAddressForm address={data} refetch={refetch} />;
};

export default UpdateOrderAddressScreen;
