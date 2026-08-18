import { useUser } from "@/hooks/use-user";
import { getAvatarName } from "@/utils/avatar-name";
import { useRouter } from "expo-router";
import { SymbolView } from "expo-symbols";
import { TouchableOpacity, View } from "react-native";
import { Fragment } from "react/jsx-runtime";
import { useCSSVariable } from "uniwind";
import { ViewAllShopButton } from "../shop/view-all-shop-button";
import { Avatar } from "../ui/avatar";
import { Separator } from "../ui/separator";
import { ThemedText } from "../ui/themed-text";

export const ShopList = () => {
  const mutedColor = useCSSVariable("--color-muted");
  const router = useRouter();
  const { user } = useUser();

  if (!user) return null;

  const shops =
    user.shopDetails.length > 6
      ? user.shopDetails.slice(0, 6)
      : user.shopDetails;

  return (
    <View>
      <View className="flex-row items-center justify-between px-2.5 pb-2.5">
        <ThemedText className="text-base font-medium">Manage Stores</ThemedText>
        <ViewAllShopButton />
      </View>

      {shops.map((shop) => (
        <Fragment key={shop.shopId}>
          <TouchableOpacity
            className="px-4 py-2"
            onPress={() => {
              router.push({
                pathname: "/shop/[shopId]",
                params: {
                  shopId: shop.shopId,
                },
              });
            }}
          >
            <View className="flex-row items-center justify-between gap-3">
              <View className="flex-row items-center gap-1 flex-1">
                <Avatar>
                  <Avatar.Fallback source={undefined}>
                    {getAvatarName(shop.shopName)}
                  </Avatar.Fallback>
                </Avatar>
                <ThemedText numberOfLines={1} className="flex-1">
                  {shop.shopName}
                </ThemedText>
              </View>
              <SymbolView
                size={20}
                tintColor={mutedColor as string}
                name={{
                  android: "chevron_right",
                  ios: "chevron.right",
                }}
              />
            </View>
          </TouchableOpacity>
          <Separator />
        </Fragment>
      ))}
    </View>
  );
};
