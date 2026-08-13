import {
  GET_ALL_SHOP_USERS_QUERY_KEY,
  GET_SHOP_DETAILS_QUERY_KEY,
} from "@/constants/query-keys";
import { useSelectedShop } from "@/hooks/use-selected-shop";
import { IshopDetails } from "@/types/IShop";
import { IShopUser } from "@/types/IShopUsers";
import { fetcher } from "@/utils/fetcher";
import { useQuery } from "@tanstack/react-query";

export const useGetAllShopUsers = () => {
  const { selectedShop } = useSelectedShop();
  return useQuery<IShopUser[]>({
    queryKey: [GET_ALL_SHOP_USERS_QUERY_KEY, selectedShop?.shopId],
    queryFn: async () =>
      await fetcher({
        url: `/shop/assistant/seller/${selectedShop?.shopId}`,
      }),
  });
};

export const useGetShopDetails = (shopId?: string) => {
  return useQuery<IshopDetails>({
    queryKey: [GET_SHOP_DETAILS_QUERY_KEY, shopId],
    queryFn: async () =>
      await fetcher({
        url: `/shop/details/${shopId}`,
      }),
    enabled: !!shopId,
  });
};
