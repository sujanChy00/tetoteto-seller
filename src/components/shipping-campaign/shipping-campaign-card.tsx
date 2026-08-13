import { useLanguage } from "@/hooks/use-language";
import { useSelectedShop } from "@/hooks/use-selected-shop";
import { IShipppingCampaign } from "@/types";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, View } from "react-native";

import { SymbolView } from "expo-symbols";
import { twMerge } from "tailwind-merge";
import { Card } from "../ui/card";
import { Host } from "../ui/host";
import { Separator } from "../ui/separator";
import { ThemedText } from "../ui/themed-text";
import { ToggleShippingCampaignStatus } from "./toggle-shipping-campaign-status";

interface Props {
  campaign: IShipppingCampaign;
  successColor: string;
  mutedColor: string;
}

export const ShippingCampaignCard = React.memo(
  ({ campaign, successColor, mutedColor }: Props) => {
    const { t } = useLanguage();
    const router = useRouter();
    const { selectedShop } = useSelectedShop();
    return (
      <Card.Root>
        <Pressable
          className="gap-6"
          onPress={() => {
            if (selectedShop?.shopAssistantCountry === "VN") return;

            router.push({
              pathname: "/shipping-campaign/[id]",
              params: {
                id: campaign.shippingCampaignId,
              },
            });
          }}
        >
          <Card.Header className="gap-6">
            <View className="flex-row justify-between gap-6 items-center">
              <View className="gap-1 flex-1">
                <ThemedText
                  className={twMerge(
                    "uppercase text-[8px] font-medium",
                    campaign.shippingCampaignActive
                      ? "text-success"
                      : "text-warning",
                  )}
                >
                  {campaign.shippingCampaignActive
                    ? "active campaign"
                    : "paused"}
                </ThemedText>
                <Card.Title numberOfLines={2} className="flex-1 text-lg">
                  {campaign.shippingCampaignName}
                </Card.Title>
              </View>
              <View className="bg-default rounded-full size-10 flex-row items-center justify-center">
                <SymbolView
                  name={{
                    android: "edit",
                    ios: "pencil",
                  }}
                  size={18}
                  tintColor={mutedColor as string}
                />
              </View>
            </View>
            <View className="flex-row items-start gap-10">
              <View className="gap-1">
                <ThemedText className="text-muted uppercase font-medium text-[10px]">
                  Discount
                </ThemedText>
                <View className="flex-row items-center gap-2">
                  <SymbolView
                    name={{
                      android: "confirmation_number",
                      ios: "ticket.fill",
                    }}
                    tintColor={successColor as string}
                    size={18}
                  />
                  <ThemedText className="font-semibold">
                    {campaign.shippingCampaignDiscountPercentage}%
                  </ThemedText>
                </View>
              </View>
              <View className="gap-1">
                <ThemedText className="text-muted uppercase font-medium text-[10px]">
                  Campaign Type
                </ThemedText>
                <View className="flex-row items-center gap-2">
                  <SymbolView
                    size={18}
                    tintColor={successColor as string}
                    name={{
                      ios: "megaphone",
                      android: "campaign",
                    }}
                  />

                  <ThemedText className="font-semibold">
                    {campaign.shippingCampaignType.replaceAll("_", " ")}
                  </ThemedText>
                </View>
              </View>
            </View>
          </Card.Header>
          <Host matchContents={{ vertical: true }}>
            <Separator />
          </Host>
          <Card.Body className="gap-3">
            <View className="flex-row items-center justify-between gap-3">
              <View className="flex-row gap-2 items-center">
                <SymbolView
                  name={{
                    android: "calendar_month",
                    ios: "calendar",
                  }}
                  tintColor={mutedColor as string}
                  size={18}
                />

                <ThemedText className="text-muted text-xs">
                  Start Date
                </ThemedText>
              </View>
              <ThemedText className="text-xs font-semibold">
                {new Date(campaign.shippingCampaignStartDate).toDateString()}
              </ThemedText>
            </View>
            <View className="flex-row items-center justify-between gap-3">
              <View className="flex-row gap-2 items-center">
                <SymbolView
                  name={{
                    android: "calendar_month",
                    ios: "calendar",
                  }}
                  tintColor={mutedColor as string}
                  size={18}
                />
                <ThemedText className="text-muted text-xs">End Date</ThemedText>
              </View>
              <ThemedText className="text-xs font-semibold">
                {new Date(campaign.shippingCampaignEndDate).toDateString()}
              </ThemedText>
            </View>
          </Card.Body>
        </Pressable>
        <Card.Footer className="pt-6">
          <ToggleShippingCampaignStatus campaign={campaign} />
        </Card.Footer>
      </Card.Root>
    );
  },
);
