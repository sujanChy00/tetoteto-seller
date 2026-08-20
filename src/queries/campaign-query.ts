import { useQuery } from "@tanstack/react-query";

import {
  GET_ALL_SHIPPING_AREA_QUERY_KEY,
  GET_ALL_SHIPPING_CAMPAIGN_QUERY_KEY,
  GET_SHIPPING_CAMPAIGN_BY_ID_QUERY_KEY,
} from "@/constants/query-keys";
import { useSelectedShop } from "@/hooks/use-selected-shop";
import { IShippingArea } from "@/types/IGeneral";
import { IShipppingCampaign } from "@/types/IShippingCampaign";
import { fetcher } from "@/utils/fetcher";

export const useGetAllShippingCampaigns = () => {
  const { selectedShop } = useSelectedShop();
  const { shopId } = selectedShop || {};
  return useQuery<IShipppingCampaign[]>({
    queryKey: [GET_ALL_SHIPPING_CAMPAIGN_QUERY_KEY, shopId],
    queryFn: async () =>
      await fetcher({
        url: `/shipping-campaign/${shopId}`,
      }),
    enabled: !!shopId,
  });
};

export const useGetAllShippingArea = (enabled: boolean) => {
  return useQuery<IShippingArea[]>({
    queryKey: [GET_ALL_SHIPPING_AREA_QUERY_KEY],
    queryFn: async () =>
      await fetcher({
        url: "/shippingArea",
      }),
    enabled,
  });
};

export const useGetShippingCampaignById = (id: string) => {
  return useQuery({
    queryKey: [GET_SHIPPING_CAMPAIGN_BY_ID_QUERY_KEY, id],
    queryFn: async () =>
      await fetcher<IShipppingCampaign>({
        url: `/shipping-campaign/get-campaign/${id}`,
      }),
    enabled: !!id,
  });
};
