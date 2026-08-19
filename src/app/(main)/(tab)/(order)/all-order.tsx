import { OrderFilters } from "@/components/order/order-filters";
import { OrderList } from "@/components/order/order-list";
import { View } from "react-native";

const AllOrderScreen = () => {
  return (
    <View className="flex-1">
      <OrderList status="all" orderType="all" />
      <OrderFilters />
    </View>
  );
};

export default AllOrderScreen;
