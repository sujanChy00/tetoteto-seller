import { SalesChart } from "@/components/home/sales-chart";
import { ShopSelector } from "@/components/layout/shop-selector";
// import DateRangePicker from "@/components/ui/date-range-picker";
import { useLogoutMutation } from "@/mutation/auth-mutation";
import { useGetHomeData } from "@/queries/home-query";
import { useState } from "react";
import { Button, RefreshControl, ScrollView } from "react-native";
import { DateType } from "react-native-ui-datepicker";

export default function Index() {
  const { mutate: logout } = useLogoutMutation();
  const [date, setDate] = useState<{
    endDate?: DateType;
    startDate?: DateType;
  }>({});

  const [refreshing, setRefreshing] = useState(false);
  const { data, isPending, isRefetching, refetch } = useGetHomeData();

  const isLoading = isPending || isRefetching;

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentInsetAdjustmentBehavior="automatic"
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={() => {
            setRefreshing(true);
            refetch().finally(() => setRefreshing(false));
          }}
        />
      }
      contentContainerClassName="py-safe-offset-8"
    >
      <ShopSelector />
      {/*<DateRangePicker value={date} onChange={setDate} />*/}
      {/*<Host matchContents={{ vertical: true }} style={{ width: "100%" }}>
        <Row modifiers={[fillMaxWidth()]} spacing={10}>
          <Button modifiers={[weight(1)]}>
            <Text>Button 1</Text>
          </Button>
          <Button modifiers={[weight(1)]}>
            <Text>Button 2</Text>
          </Button>
        </Row>
      </Host>
      <View className="px-4">
        <Host matchContents={{ vertical: true }} style={{ width: "100%" }}>
          <Button modifiers={[weight(1)]}>
            <Text>Button 1</Text>
          </Button>
        </Host>
      </View>*/}
      <SalesChart isPending={isLoading} data={data?.weeklySales} />
      <Button
        title="logout"
        onPress={() => {
          logout();
        }}
      />
    </ScrollView>
  );
}
