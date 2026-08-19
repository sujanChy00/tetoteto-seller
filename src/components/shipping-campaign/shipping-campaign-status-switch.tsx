import { useUpdateShippingCampaign } from "@/mutation/campaign-mutation";
import { IShipppingCampaign } from "@/types";
import { View } from "react-native";
import { Surface } from "../ui/surface";
import { SwitchInput } from "../ui/switch-input";
import { ThemedText } from "../ui/themed-text";

interface Props {
  campaign: IShipppingCampaign;
}

export const ShippingCampaignStatusSwitch = ({ campaign }: Props) => {
  const { mutate, isPending } = useUpdateShippingCampaign();

  const updateCampaign = (checked: boolean) => {
    mutate({
      ...campaign,
      campaignId: campaign.shippingCampaignId,
      shippingCampaignStartDate: new Date(campaign.shippingCampaignStartDate),
      shippingCampaignEndDate: new Date(campaign.shippingCampaignEndDate),
      shippingCampaignActive: checked,
      shippingAreas: campaign.shippingAreas.map((a) => a.shippingAreaId),
    });
  };

  return (
    <Surface className="bg-surface-secondary/80 rounded-2xl p-0">
      <View
        accessibilityLabel="Campaign Status"
        accessibilityState={{ checked: campaign.shippingCampaignActive }}
        className="flex-row items-center justify-between p-3"
      >
        <ThemedText className="text-sm font-medium">Campaign Status</ThemedText>
        <SwitchInput
          value={campaign.shippingCampaignActive}
          onValueChange={updateCampaign}
        />
      </View>
    </Surface>
  );
};
