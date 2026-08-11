import { useAppTheme } from "@/context/app-theme-provider";
import { useUser } from "@/hooks/use-user";
import { getAvatarName } from "@/utils/avatar-name";
import { Icon, ListItem, RNHostView } from "@expo/ui";
import { useRouter } from "expo-router";
import { SymbolView } from "expo-symbols";
import { Pressable, View } from "react-native";
import { Fragment } from "react/jsx-runtime";
import { useCSSVariable } from "uniwind";
import { Avatar } from "../ui/avatar";
import { Separator } from "../ui/separator";
import { ThemedText } from "../ui/themed-text";

const CHEVRON = Icon.select({
  ios: "chevron.right",
  android: require("@expo/material-symbols/chevron_right.xml"),
});

export const ShopList = () => {
  const { colors } = useAppTheme();
  const mutedColor = useCSSVariable("--color-muted");

  const router = useRouter();
  const { user } = useUser();

  if (!user) return null;

  const shops =
    user.shopDetails.length > 6
      ? user.shopDetails.slice(0, 6)
      : user.shopDetails;

  return (
    <>
      <RNHostView matchContents>
        <View className="flex-row items-center justify-between px-2.5 pb-2.5">
          <ThemedText className="text-base font-medium">
            Manage Stores
          </ThemedText>
          <Pressable
            onPress={() => {
              router.push({
                pathname: "/shop",
              });
            }}
            className="flex-row items-center gap-1"
          >
            <ThemedText>view all</ThemedText>
            <SymbolView
              name={{
                android: "arrow_right_alt",
                ios: "arrow.right",
              }}
              size={16}
              tintColor={mutedColor as string}
            />
          </Pressable>
        </View>
      </RNHostView>
      {shops.map((shop) => (
        <Fragment key={shop.shopId}>
          <ListItem
            trailing={
              <Icon name={CHEVRON} color={mutedColor as string} size={20} />
            }
            leading={
              <RNHostView matchContents>
                <Avatar.Root>
                  <Avatar.Fallback>
                    {getAvatarName(shop.shopName)}
                  </Avatar.Fallback>
                </Avatar.Root>
              </RNHostView>
            }
            onPress={() => {
              router.push({
                pathname: "/shop/[shopId]",
                params: {
                  shopId: shop.shopId,
                },
              });
            }}
          >
            {shop.shopName}
          </ListItem>
          <Separator />
        </Fragment>
      ))}
    </>
  );
};
