import {
  GET_ALL_INFINITE_SHIPMENTS_QUERY_KEY,
  GET_ALL_ORDERS_INFINITE_QUERY_KEY,
  GET_ALL_ORDERS_QUERY_KEY,
  GET_ALL_SHIPMENTS_QUERY_KEY,
  GET_ORDER_DETAILS_QUERY_KEY,
} from "@/constants/query-keys";
import { useSelectedShop } from "@/hooks/use-selected-shop";
import {
  IGeneralResponse,
  IPaginatedParams,
  IPaginatedResponse,
  ITransactionById,
  ITransactionResponse,
  OrderTrackingResponse,
} from "@/types";
import { fetcher } from "@/utils/fetcher";
import { purifyObject } from "@/utils/purify-object";
import { errorToast } from "@/utils/toast";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Linking } from "react-native";

export const useGetAllOrdersInfiniteQuery = (params: IPaginatedParams) => {
  const { selectedShop } = useSelectedShop();
  const { shopId } = selectedShop || {};
  return useInfiniteQuery<ITransactionResponse>({
    queryKey: [GET_ALL_ORDERS_INFINITE_QUERY_KEY, params, shopId],
    queryFn: async ({ pageParam = 0 }) =>
      fetcher({
        url: `/order/list/shop/${shopId}`,
        params: {
          ...purifyObject(params as Record<string, unknown>),
          page: pageParam,
        },
      }),
    enabled: !!selectedShop,
    initialPageParam: 0,
    getNextPageParam(page) {
      return page.last ? undefined : page.pageNumber + 1;
    },
  });
};
export const useGetAllOrdersQuery = (params: IPaginatedParams) => {
  const { selectedShop } = useSelectedShop();
  const { shopId } = selectedShop || {};
  return useQuery<ITransactionResponse>({
    queryKey: [GET_ALL_ORDERS_QUERY_KEY, params, shopId],
    queryFn: async () =>
      fetcher({
        url: `/order/list/shop/${shopId}`,
        params: {
          ...purifyObject(params as Record<string, unknown>),
        },
      }),
    enabled: !!selectedShop,
  });
};

export const useGetOrderById = ({
  id,
  enabled = true,
}: {
  id?: number;
  enabled?: boolean;
}) => {
  return useQuery<ITransactionById>({
    queryKey: [GET_ORDER_DETAILS_QUERY_KEY, id],
    queryFn: async () => {
      return fetcher({
        url: `/order/detail/${id}`,
      });
    },
    enabled: !!id && enabled,
  });
};

export const useGenerateInvoice = (orderId?: number) => {
  const [isLoading, setIsLoading] = useState(false);

  const getInvoice = () => {
    if (!orderId) {
      errorToast({
        title: "Error",
        description: "Couldn't get invoice for this order",
      });
      return;
    }
    setIsLoading(true);
    fetcher<IGeneralResponse>({
      url: `/invoice/${orderId}`,
    })
      .then((res) => {
        if (res.message) {
          Linking.openURL(res.message);
        } else {
          errorToast({
            title: "Error",
            description: "Couldn't get invoice for this order",
          });
        }
      })
      .catch(() => {
        errorToast({
          title: "Error",
          description: "Couldn't get invoice for this order",
        });
      })
      .finally(() => setIsLoading(false));
  };

  return { getInvoice, isLoading };
};

export const useGetAllShipmentsInfiniteQuery = (params: {
  filter?: string;
}) => {
  const { selectedShop } = useSelectedShop();
  const { shopId } = selectedShop || {};
  return useInfiniteQuery<IPaginatedResponse<OrderTrackingResponse>>({
    queryKey: [GET_ALL_INFINITE_SHIPMENTS_QUERY_KEY, params, shopId],
    queryFn: async ({ pageParam = 0 }) =>
      fetcher({
        url: `/order/track-shipments/${shopId}`,
        params: { ...params, page: pageParam },
      }),
    enabled: !!selectedShop,
    initialPageParam: 0,
    getNextPageParam(page) {
      return page.last ? undefined : page.pageNumber + 1;
    },
  });
};
export const useGetAllShipmentsQuery = (params: { filter?: string }) => {
  const { selectedShop } = useSelectedShop();
  const { shopId } = selectedShop || {};
  return useQuery<IPaginatedResponse<OrderTrackingResponse>>({
    queryKey: [GET_ALL_SHIPMENTS_QUERY_KEY, params, shopId],
    queryFn: async () =>
      fetcher({
        url: `/order/track-shipments/${shopId}`,
        params,
      }),
    enabled: !!selectedShop,
  });
};
