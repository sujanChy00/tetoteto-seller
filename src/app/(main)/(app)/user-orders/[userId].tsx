import { orderSortOptions } from "@/constants/data";
import DATE_RANGE_ICON from "@expo/material-symbols/date_range.xml";
import SORT_ICON from "@expo/material-symbols/sort.xml";
import { Stack } from "expo-router";
import { Text, TextInput, View } from "react-native";

const UserOrderScreen = () => {
  return (
    <View className="flex-1">
      <Text>UserOrderScreen</Text>
      <Stack.Toolbar placement="bottom">
        <Stack.Toolbar.Menu icon={SORT_ICON}>
          {orderSortOptions.map((opt) => (
            <Stack.Toolbar.MenuAction key={opt.value}>
              {opt.label}
            </Stack.Toolbar.MenuAction>
          ))}
        </Stack.Toolbar.Menu>
        <Stack.Toolbar.View>
          <TextInput
            placeholder="search..."
            className="rounded-full bg-border px-3 w-[200px]"
          />
        </Stack.Toolbar.View>
        <Stack.Toolbar.Button icon={DATE_RANGE_ICON} />
      </Stack.Toolbar>
    </View>
  );
};

export default UserOrderScreen;
