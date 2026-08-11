import { ShopList } from "@/components/profile/shop-list";
import { Host } from "@/components/ui/host";
import { Icon, List } from "@expo/ui";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

const ITEMS = [
  { id: 1, name: "Avocado toast" },
  { id: 2, name: "Bagel with cream cheese" },
  { id: 3, name: "Cappuccino" },
];

const CHEVRON = Icon.select({
  ios: "chevron.right",
  android: require("@expo/material-symbols/chevron_right.xml"),
});

const ProfileScreen = () => {
  const { top, bottom } = useSafeAreaInsets();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Host style={{ flex: 1 }}>
        <List>
          <ShopList />
        </List>
      </Host>
    </SafeAreaView>
  );
};

export default ProfileScreen;
