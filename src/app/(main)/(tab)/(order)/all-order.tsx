import { OrderList } from "@/components/order/order-list";
import { View } from "react-native";

const AllOrderScreen = () => {
  return (
    <View className="flex-1">
      <OrderList status="all" orderType="all" />
    </View>
  );
};

export default AllOrderScreen;
