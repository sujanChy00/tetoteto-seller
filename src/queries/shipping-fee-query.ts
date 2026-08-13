import {
  GET_ALL_SHIPPING_COMPANY_QUERY_KEY,
  GET_ALL_SHIPPING_FEE_QUERY_KEY,
} from "@/constants/query-keys";
import { useSelectedShop } from "@/hooks/use-selected-shop";
import { IShippingCompany, IshippingFee } from "@/types/IshippingFee";
import { fetcher } from "@/utils/fetcher";
import { useQuery } from "@tanstack/react-query";

export const useGetAllShippingFee = () => {
  const { selectedShop } = useSelectedShop();
  const { shopId } = selectedShop || {};
  return useQuery<IshippingFee[]>({
    queryKey: [GET_ALL_SHIPPING_FEE_QUERY_KEY, shopId],
    queryFn: async () =>
      await fetcher({
        url: `/shipping/shop/${shopId}`,
      }),
    enabled: !!shopId,
  });
};

export const useGetAllShippingCompany = () => {
  return useQuery<IShippingCompany[]>({
    queryKey: [GET_ALL_SHIPPING_COMPANY_QUERY_KEY],
    async queryFn() {
      return fetcher({
        url: "/shipping/company/active",
      });
    },
  });
};
