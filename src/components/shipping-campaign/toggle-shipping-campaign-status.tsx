import { useUpdateShippingCampaign } from "@/mutation/campaign-mutation";
import { IShipppingCampaign } from "@/types";
import { Switch } from "@expo/ui";
import { Pressable, View } from "react-native";
import { Host } from "../ui/host";
import { Surface } from "../ui/surface";
import { ThemedText } from "../ui/themed-text";

interface Props {
  campaign: IShipppingCampaign;
}

export const ToggleShippingCampaignStatus = ({ campaign }: Props) => {
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
      <Pressable
        onPress={() => updateCampaign(!campaign.shippingCampaignActive)}
        disabled={isPending}
        className="flex-row items-center justify-between p-3"
      >
        <ThemedText className="text-sm font-medium">Campaign Status</ThemedText>
        <View pointerEvents="none">
          <Host matchContents>
            <Switch
              value={campaign.shippingCampaignActive}
              onValueChange={updateCampaign}
            />
          </Host>
        </View>
      </Pressable>
    </Surface>
  );
};
