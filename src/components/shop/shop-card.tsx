import { ISellerShopDetail } from "@/types";
import { Icon, Spacer, Text } from "@expo/ui";
import { useRouter } from "expo-router";
import React from "react";
import { View } from "react-native";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Chip } from "../ui/chip";
import { Host } from "../ui/host";
import { Row } from "../ui/row";

const EDIT_ICON = Icon.select({
  ios: "pencil",
  android: require("@expo/material-symbols/edit.xml"),
});

export const ShopCard = React.memo(({ shop }: { shop: ISellerShopDetail }) => {
  const router = useRouter();
  return (
    <Card.Root className="gap-6">
      <Card.Header>
        <View className="flex-row items-center justify-between gap-3">
          <Card.Title numberOfLines={1} className="flex-1">
            {shop.shopName}
          </Card.Title>
          <Chip.Root variant="secondary">
            <Chip.Label>{shop.shopAssistantCountry}</Chip.Label>
          </Chip.Root>
        </View>
        <Card.Description className="text-sm">
          {shop.shopAddress}
        </Card.Description>
      </Card.Header>
      <Card.Footer className="w-full">
        <Host matchContents={{ vertical: true }} style={{ height: 50 }}>
          <Row alignment="center">
            <Button
              height={50}
              onPress={() => {
                router.push({
                  pathname: "/shop/[shopId]",
                  params: {
                    shopId: shop.shopId,
                  },
                });
              }}
            >
              <Text>View</Text>
            </Button>
            <Spacer size={12} />
            <Button
              height={50}
              onPress={() => {
                router.push({
                  pathname: "/shop/[shopId]/edit",
                  params: {
                    shopId: shop.shopId,
                  },
                });
              }}
              variant="filled"
              fillFullWidth={false}
            >
              <Icon name={EDIT_ICON} />
            </Button>
          </Row>
        </Host>
      </Card.Footer>
    </Card.Root>
  );
});
