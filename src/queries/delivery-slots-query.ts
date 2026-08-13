import { useQuery } from "@tanstack/react-query";

import { IShopDeliveryTimes } from "../types/IAvailableDeliveries";

import {
  GET_ALL_AVAILABLE_DELIVERY_TIME_SLOTS_QUERY_KEY,
  GET_SHOP_AVAILABLE_DELIVERY_TIME_SLOTS_QUERY_KEY,
} from "@/constants/query-keys";
import { useSelectedShop } from "@/hooks/use-selected-shop";
import { fetcher } from "@/utils/fetcher";

export const useGetShopAvailableDeliveryTimes = () => {
  const { selectedShop } = useSelectedShop();
  return useQuery<IShopDeliveryTimes>({
    queryKey: [
      GET_SHOP_AVAILABLE_DELIVERY_TIME_SLOTS_QUERY_KEY,
      selectedShop?.shopId,
    ],
    queryFn: async () =>
      await fetcher({
        url: `/delivery-time/${selectedShop?.shopId}`,
      }),
  });
};

export const useGetAvailableDeliveryTimes = () => {
  return useQuery<IShopDeliveryTimes[]>({
    queryKey: [GET_ALL_AVAILABLE_DELIVERY_TIME_SLOTS_QUERY_KEY],
    queryFn: async () =>
      await fetcher({
        url: `/delivery-time/available`,
      }),
  });
};
