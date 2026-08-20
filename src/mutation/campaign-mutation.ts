import { useMutation, useQueryClient } from "@tanstack/react-query";

import { GET_ALL_SHIPPING_CAMPAIGN_QUERY_KEY } from "@/constants/query-keys";
import { useHaptics } from "@/hooks/use-haptics";
import { useLanguage } from "@/hooks/use-language";
import { useSelectedShop } from "@/hooks/use-selected-shop";
import { ShippingCampaignFormValues } from "@/schema/shipping-campaign-schema";
import { IGeneralResponse, mutationProps } from "@/types/IGeneral";
import { fetcher } from "@/utils/fetcher";
import { purifyObject } from "@/utils/purify-object";
import { errorToast, successToast } from "@/utils/toast";

export const useUpdateShippingCampaign = ({
  onSuccess,
  onError,
}: mutationProps<IGeneralResponse> = {}) => {
  const queryClient = useQueryClient();
  const { selectedShop } = useSelectedShop();
  const { t } = useLanguage();
  const haptics = useHaptics();

  return useMutation({
    mutationFn: async (
      body: Omit<ShippingCampaignFormValues, "discountType"> & {
        campaignId: number;
      },
    ) => {
      const { campaignId, ...data } = body;
      return await fetcher<IGeneralResponse>({
        url: `/shipping-campaign/${selectedShop?.shopId}/${campaignId}`,
        method: "PUT",
        data: purifyObject(data),
      });
    },
    onSuccess(data) {
      queryClient.invalidateQueries({
        queryKey: [GET_ALL_SHIPPING_CAMPAIGN_QUERY_KEY],
      });
      successToast({
        title: t("operation_successfull"),
        description: data.message,
      });
      onSuccess?.(data);
    },
    onError(error) {
      haptics("error");
      errorToast({
        title: t("error"),
        description: error.message,
      });
      onError?.(error);
    },
  });
};

export const useAddShippingCampaign = ({
  onSuccess,
  onError,
}: mutationProps<IGeneralResponse> = {}) => {
  const queryClient = useQueryClient();
  const haptics = useHaptics();
  const { selectedShop } = useSelectedShop();
  const { t } = useLanguage();

  return useMutation({
    mutationFn: async (
      body: Omit<ShippingCampaignFormValues, "discountType">,
    ) => {
      return await fetcher<IGeneralResponse>({
        url: `/shipping-campaign/${selectedShop?.shopId}`,
        data: purifyObject(body),
        method: "POST",
      });
    },
    onSuccess(data) {
      queryClient.invalidateQueries({
        queryKey: [GET_ALL_SHIPPING_CAMPAIGN_QUERY_KEY],
      });
      successToast({
        title: t("operation_successfull"),
        description: data.message,
      });
      onSuccess?.(data);
    },
    onError(error) {
      haptics("error");
      errorToast({
        title: t("error"),
        description: error.message,
      });
      onError?.(error);
    },
  });
};
