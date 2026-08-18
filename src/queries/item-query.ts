import {
  GET_ALL_ITEMS_INFINITE_QUERY_KEY,
  GET_EXPIRED_ITEMS_INFINITE_QUERY_KEY,
  GET_IN_STOCK_ITEMS_INFINITE_QUERY_KEY,
  GET_IN_STOCK_ITEMS_QUERY_KEY,
  GET_ITEM_DETAILS_QUERY_KEY,
  GET_LOW_STOCK_ITEMS_INFINITE_QUERY_KEY,
  GET_LOW_STOCK_ITEMS_QUERY_KEY,
  RECOMMENDED_ITEMS_QUERY_KEY,
} from "@/constants/query-keys";
import { useSelectedShop } from "@/hooks/use-selected-shop";
import {
  IItemDescriptionResponse,
  IItemLowStockResponse,
  IItemResponse,
  IItemStockResponse,
  IPaginatedParams,
} from "@/types";
import { fetcher } from "@/utils/fetcher";
import { purifyObject } from "@/utils/purify-object";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

export const useInfiniteItemQuery = (params: IPaginatedParams) => {
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

export const useInfiniteStockItemQuery = (params: IPaginatedParams) => {
  const { selectedShop } = useSelectedShop();
  return useInfiniteQuery({
    queryKey: [
      GET_IN_STOCK_ITEMS_INFINITE_QUERY_KEY,
      selectedShop?.shopId,
      params,
    ],
    queryFn: ({ pageParam = 0 }) =>
      fetcher<IItemStockResponse>({
        url: `/seller/item-stock/${selectedShop?.shopId}`,
        params: {
          size: 20,
          page: pageParam,
          sort: params?.sort || "updated_at",
        },
      }),
    enabled: !!selectedShop?.shopId,
    initialPageParam: 0,
    getNextPageParam(res) {
      return res.last ? undefined : res.pageNumber + 1;
    },
  });
};

export const useInfiniteLowStockItemQuery = (params: IPaginatedParams) => {
  const { selectedShop } = useSelectedShop();
  return useInfiniteQuery({
    queryKey: [
      GET_LOW_STOCK_ITEMS_INFINITE_QUERY_KEY,
      selectedShop?.shopId,
      params,
    ],
    queryFn: ({ pageParam = 0 }) =>
      fetcher<IItemLowStockResponse>({
        url: `/seller/low-stock/${selectedShop?.shopId}`,
        params: {
          size: 20,
          page: pageParam,
          sort: params?.sort || "updated_at",
        },
      }),
    enabled: !!selectedShop?.shopId,
    initialPageParam: 0,
    getNextPageParam(res) {
      return res.last ? undefined : res.pageNumber + 1;
    },
  });
};

export const useInfiniteExpiredItemQuery = (params: IPaginatedParams) => {
  const { selectedShop } = useSelectedShop();
  return useInfiniteQuery({
    queryKey: [
      GET_EXPIRED_ITEMS_INFINITE_QUERY_KEY,
      selectedShop?.shopId,
      params,
    ],
    queryFn: ({ pageParam = 0 }) =>
      fetcher<IItemLowStockResponse>({
        url: `/seller/expiring-items/${selectedShop?.shopId}`,
        params: {
          size: 20,
          page: pageParam,
          q: params?.query,
          sort: params?.sort || "updated_at",
        },
      }),
    enabled: !!selectedShop?.shopId,
    initialPageParam: 0,
    getNextPageParam(res) {
      return res.last ? undefined : res.pageNumber + 1;
    },
  });
};

export const useExpiredItemQuery = (params: IPaginatedParams) => {
  const { selectedShop } = useSelectedShop();
  return useQuery({
    queryKey: [
      GET_EXPIRED_ITEMS_INFINITE_QUERY_KEY,
      selectedShop?.shopId,
      params,
    ],
    queryFn: () =>
      fetcher<IItemLowStockResponse>({
        url: `/seller/expiring-items/${selectedShop?.shopId}`,
        params: {
          size: 20,
          page: params.page,
          sort: params?.sort || "updated_at",
        },
      }),
    enabled: !!selectedShop?.shopId,
  });
};

export const useLowStockItemQuery = (params: IPaginatedParams) => {
  const { selectedShop } = useSelectedShop();
  return useQuery({
    queryKey: [GET_LOW_STOCK_ITEMS_QUERY_KEY, selectedShop?.shopId, params],
    queryFn: () =>
      fetcher<IItemLowStockResponse>({
        url: `/seller/low-stock/${selectedShop?.shopId}`,
        params: {
          size: 20,
          page: params.page,
          sort: params.sort || "updated_at",
        },
      }),
    enabled: !!selectedShop?.shopId,
  });
};
export const useStockItemQuery = (params: IPaginatedParams) => {
  const { selectedShop } = useSelectedShop();
  return useQuery({
    queryKey: [GET_IN_STOCK_ITEMS_QUERY_KEY, selectedShop?.shopId, params],
    queryFn: () =>
      fetcher<IItemStockResponse>({
        url: `/seller/item-stock/${selectedShop?.shopId}`,
        params: {
          size: 20,
          page: params.page,
          sort: params?.sort || "updated_at",
        },
      }),
    enabled: !!selectedShop?.shopId,
  });
};

export const useItemQuery = (params: IPaginatedParams) => {
  const { selectedShop } = useSelectedShop();
  return useQuery({
    queryKey: [GET_ALL_ITEMS_INFINITE_QUERY_KEY, selectedShop?.shopId, params],
    queryFn: () =>
      fetcher<IItemResponse>({
        url: `/seller/items/${selectedShop?.shopId}`,
        params: purifyObject(params as Record<string, unknown>),
      }),
    enabled: !!selectedShop?.shopId,
  });
};

export const useGetItemDetail = (itemId?: string) => {
  return useQuery<IItemDescriptionResponse>({
    queryKey: [GET_ITEM_DETAILS_QUERY_KEY, RECOMMENDED_ITEMS_QUERY_KEY, itemId],
    queryFn: async () =>
      await fetcher({
        url: `/seller/item/${itemId}`,
      }),
    enabled: !!itemId,
  });
};
