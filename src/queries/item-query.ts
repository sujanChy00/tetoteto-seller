import { GET_ALL_ITEMS_INFINITE_QUERY_KEY } from "@/constants/query-keys";
import { useSelectedShop } from "@/hooks/use-selected-shop";
import { IItemResponse } from "@/types";
import { fetcher } from "@/utils/fetcher";
import { purifyObject } from "@/utils/purify-object";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

export const useInfiniteItemQuery = (params: {
  query?: string | undefined;
  order?: string | undefined;
  sort?: string | undefined;
}) => {
  const { selectedShop } = useSelectedShop();
  return useInfiniteQuery({
    queryKey: [GET_ALL_ITEMS_INFINITE_QUERY_KEY, selectedShop?.shopId, params],
    queryFn: ({ pageParam = 0 }) =>
      fetcher<IItemResponse>({
        url: `/seller/items/${selectedShop?.shopId}`,
        params: {
          size: 20,
          page: pageParam,
          order: params?.order ? Number(params?.order) : undefined,
          sort: params?.sort || "updated_at",
          q: params?.query,
        },
      }),
    enabled: !!selectedShop?.shopId,
    initialPageParam: 0,
    getNextPageParam(res) {
      return res.last ? undefined : res.pageNumber + 1;
    },
  });
};

export const useItemQuery = (params: {
  query?: string | undefined;
  order?: string | undefined;
  sort?: string | undefined;
}) => {
  const { selectedShop } = useSelectedShop();
  return useQuery({
    queryKey: [GET_ALL_ITEMS_INFINITE_QUERY_KEY, selectedShop?.shopId, params],
    queryFn: ({ pageParam = 0 }) =>
      fetcher<IItemResponse>({
        url: `/seller/items/${selectedShop?.shopId}`,
        params: purifyObject(params),
      }),
    enabled: !!selectedShop?.shopId,
  });
};
