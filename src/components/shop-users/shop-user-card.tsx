import { IShopUser } from "@/types";
import { getAvatarName } from "@/utils/avatar-name";
import { dateTimeFormatterWithouTLocale } from "@/utils/date";
import { SymbolView } from "expo-symbols";
import { memo } from "react";
import { View } from "react-native";
import { useCSSVariable } from "uniwind";
import { Avatar } from "../ui/avatar";
import { Card } from "../ui/card";
import { Chip } from "../ui/chip";
import { ThemedText } from "../ui/themed-text";

export const ShopUserCard = memo(({ data }: { data: IShopUser }) => {
  const successColor = useCSSVariable("--color-success");
  const dangerColor = useCSSVariable("--color-danger");

  const isAdmin = data.sellerRole === "admin";

  return (
    <Card className="overflow-hidden">
      <Card.Header className="flex-row items-center justify-between pb-3">
        <View className="flex-row items-center gap-2">
          <Avatar className="items-center justify-center border border-border">
            <Avatar.Fallback source="">
              {getAvatarName(data.sellerName)}
            </Avatar.Fallback>
          </Avatar>
          <View>
            <View className="flex-row items-start gap-1">
              <ThemedText className="font-semibold">
                {data.sellerName}
              </ThemedText>
              {data.sellerApproved && (
                <SymbolView
                  name={{
                    android: "verified",
                    ios: "checkmark.seal.fill",
                  }}
                  tintColor={successColor as string}
                  size={18}
                />
              )}
            </View>
            <ThemedText>{data.sellerEmail}</ThemedText>
          </View>
        </View>
      </Card.Header>
      <Card.Footer className="flex-row  items-center justify-between pt-3 border-t border-t-background">
        {isAdmin ? (
          <Chip variant="soft" color="danger">
            <SymbolView
              name={{
                android: "admin_panel_settings",
                ios: "person.badge.key.fill",
              }}
              tintColor={dangerColor as string}
              size={18}
            />
            <Chip.Label>ADMIN</Chip.Label>
          </Chip>
        ) : (
          <ThemedText className="text-sm font-semibold">
            {data.sellerRole}
          </ThemedText>
        )}
        <ThemedText className="text-sm font-semibold">
          {data.sellerRole}
        </ThemedText>
        <ThemedText className="text-xs font-serif italic">
          {dateTimeFormatterWithouTLocale(new Date(data.sellerCreated))}
        </ThemedText>
      </Card.Footer>
    </Card>
  );
});
