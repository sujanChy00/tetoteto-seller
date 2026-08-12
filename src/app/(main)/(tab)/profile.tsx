import { LegalInfo } from "@/components/profile/legal-info";
import { Preferences } from "@/components/profile/preferences";
import {
  HEADER_MAX_HEIGHT,
  ProfileHeader,
} from "@/components/profile/profile-header";
import { ProfileLinks } from "@/components/profile/profile-links";
import { SecurityLinks } from "@/components/profile/security-links";
import { ShopList } from "@/components/profile/shop-list";
import { LogoutButton } from "@/components/ui/logout-button/logout-button";
import { AnimatedLegendList } from "@legendapp/list/reanimated";
import { useMemo } from "react";
import { View } from "react-native";
import {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const ProfileScreen = () => {
  const insets = useSafeAreaInsets();
  const scrollY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const components = useMemo(
    () => [
      { key: "shopList", component: <ShopList /> },
      { key: "profileLinks", component: <ProfileLinks /> },
      { key: "preferences", component: <Preferences /> },
      { key: "legalInfo", component: <LegalInfo /> },
      { key: "securityLinks", component: <SecurityLinks /> },
      {
        key: "logoutButton",
        component: (
          <View className="px-2">
            <LogoutButton />
          </View>
        ),
      },
    ],
    [],
  );

  return (
    <View className="flex-1 pt-safe">
      <ProfileHeader scrollY={scrollY} />
      <View className="h-10" />
      <AnimatedLegendList
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        recycleItems
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: HEADER_MAX_HEIGHT + insets.top }}
        ListFooterComponent={<View className="h-20" />}
        data={components}
        ItemSeparatorComponent={() => <View className="h-10" />}
        renderItem={({ item }) => item.component}
        keyExtractor={(item) => item.key}
      />
    </View>
  );
};
export default ProfileScreen;
