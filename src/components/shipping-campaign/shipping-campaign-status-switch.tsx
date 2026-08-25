import { useUpdateShippingCampaign } from "@/mutation/campaign-mutation";
import { IShipppingCampaign } from "@/types";
import { Surface } from "../ui/surface";
import { SwitchInput } from "../ui/switch-input";

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
    <Surface className="bg-surface-secondary/80 rounded-2xl p-3">
      <SwitchInput
        label="Campaign Status"
        className="justify-between"
        disabled={isPending}
        value={campaign.shippingCampaignActive}
        onValueChange={updateCampaign}
      />
    </Surface>
  );
};
