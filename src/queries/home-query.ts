import { useQuery } from "@tanstack/react-query";

import {
  GET_HOME_DATA_QUERY_KEY,
  GET_SALES_DATA_QUERY_KEY,
} from "@/constants/query-keys";
import { useSelectedShop } from "@/hooks/use-selected-shop";
import { HomeResponse, SalesData } from "@/types/Ihome";
import { fetcher } from "@/utils/fetcher";

export const useGetSalesData = (params: { from: string; to: string }) => {
  const { selectedShop } = useSelectedShop();
  const { shopId } = selectedShop || {};
  return useQuery<SalesData>({
    queryKey: [GET_SALES_DATA_QUERY_KEY, shopId, params],
    queryFn: async () =>
      await fetcher({
        url: `/home/seller/sales/${shopId}`,
        params,
      }),
    enabled: !!shopId,
  });
};

export const useGetHomeData = () => {
  const { selectedShop } = useSelectedShop();
  const { shopId } = selectedShop || {};
  return useQuery<HomeResponse>({
    queryKey: [GET_HOME_DATA_QUERY_KEY, shopId],
    queryFn: async () =>
      await fetcher({
        url: `/home/seller/${shopId}`,
      }),
    enabled: !!shopId,
  });
};
