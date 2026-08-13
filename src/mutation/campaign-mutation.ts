import { useMutation, useQueryClient } from "@tanstack/react-query";

import { GET_ALL_SHIPPING_CAMPAIGN_QUERY_KEY } from "@/constants/query-keys";
import { useHaptics } from "@/hooks/use-haptics";
import { useLanguage } from "@/hooks/use-language";
import { useSelectedShop } from "@/hooks/use-selected-shop";
import { ShippingCampaignFormData } from "@/schema/campaign-schema";
import { IShipppingCampaign } from "@/types";
import { IGeneralResponse } from "@/types/IGeneral";
import { fetcher } from "@/utils/fetcher";
import { toast } from "@/utils/toast";

export const useUpdateShippingCampaign = () => {
  const queryClient = useQueryClient();
  const haptics = useHaptics();
  const { selectedShop } = useSelectedShop();
  const { t } = useLanguage();

  return useMutation({
    mutationFn: async (
      body: Omit<ShippingCampaignFormData, "discountType"> & {
        campaignId: number;
      },
    ) => {
      const { campaignId, ...data } = body;
      return await fetcher<IGeneralResponse>({
        url: `/shipping-campaign/${selectedShop?.shopId}/${campaignId}`,
        method: "PUT",
        data,
      });
    },

    onMutate: async (body) => {
      const queryKey = [
        GET_ALL_SHIPPING_CAMPAIGN_QUERY_KEY,
        selectedShop?.shopId,
      ];

      await queryClient.cancelQueries({ queryKey });

      const previousCampaigns =
        queryClient.getQueryData<IShipppingCampaign[]>(queryKey);

      queryClient.setQueryData<IShipppingCampaign[]>(queryKey, (old) =>
        old?.map((c) =>
          c.shippingCampaignId === body.campaignId
            ? {
                ...c,
                ...body,
                shippingAreas: c.shippingAreas, // keep the richer IShippingArea[] shape; body only carries ids
              }
            : c,
        ),
      );

      return { previousCampaigns, queryKey };
    },

    onSuccess(data) {
      toast.success(t("operation_successfull"), {
        description: data.message,
      });
    },

    onError(error, _body, context) {
      if (context?.previousCampaigns) {
        queryClient.setQueryData(context.queryKey, context.previousCampaigns);
      }
      haptics("error");
      toast.error(t("error"), {
        description: error.message,
      });
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [GET_ALL_SHIPPING_CAMPAIGN_QUERY_KEY, selectedShop?.shopId],
      });
    },
  });
};

export const useAddShippingCampaign = () => {
  const queryClient = useQueryClient();
  const haptics = useHaptics();
  const { selectedShop } = useSelectedShop();
  const { t } = useLanguage();

  return useMutation({
    mutationFn: async (
      body: Omit<ShippingCampaignFormData, "discountType">,
    ) => {
      return await fetcher<IGeneralResponse>({
        url: `/shipping-campaign/${selectedShop?.shopId}`,
        data: body,
        method: "POST",
      });
    },
    onSuccess(data) {
      queryClient.invalidateQueries({
        queryKey: [GET_ALL_SHIPPING_CAMPAIGN_QUERY_KEY],
      });
      toast.success(t("operation_successfull"), {
        description: data.message,
      });
    },
    onError(error) {
      haptics("error");
      toast.error(t("error"), {
        description: error.message,
      });
    },
  });
};
