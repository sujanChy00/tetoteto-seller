import { ISellerShopDetail } from "@/types";
import { useRouter } from "expo-router";
import { SymbolView } from "expo-symbols";
import React from "react";
import { View } from "react-native";
import { useCSSVariable } from "uniwind";
import { PrimaryButton, SecondaryButton } from "../ui/button";
import { Card } from "../ui/card";
import { Chip } from "../ui/chip";

export const ShopCard = React.memo(({ shop }: { shop: ISellerShopDetail }) => {
  const router = useRouter();
  const primaryColor = useCSSVariable("--color-primary") as string;

  return (
    <Card className="gap-6">
      <Card.Header>
        <View className="flex-row items-center justify-between gap-3">
          <Card.Title numberOfLines={1} className="flex-1">
            {shop.shopName}
          </Card.Title>
          <Chip variant="secondary">
            <Chip.Label>{shop.shopAssistantCountry}</Chip.Label>
          </Chip>
        </View>
        <Card.Description className="text-sm">
          {shop.shopAddress}
        </Card.Description>
      </Card.Header>
      <Card.Footer className="w-full flex-row items-center gap-3">
        <PrimaryButton
          className="flex-1"
          onPress={() => {
            router.push({
              pathname: "/shop/[shopId]",
              params: {
                shopId: shop.shopId,
              },
            });
          }}
        >
          <PrimaryButton.Label>View</PrimaryButton.Label>
        </PrimaryButton>
        <SecondaryButton
          onPress={() => {
            router.push({
              pathname: "/shop/[shopId]/edit",
              params: {
                shopId: shop.shopId,
              },
            });
          }}
        >
          <SymbolView
            tintColor={primaryColor}
            size={18}
            name={{
              ios: "pencil",
              android: "edit",
            }}
          />
        </SecondaryButton>
      </Card.Footer>
    </Card>
  );
});
