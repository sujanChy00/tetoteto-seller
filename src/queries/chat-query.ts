import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

import {
  GET_ALL_USER_CHAT_QUERY_KEY,
  GET_UNSEEN_CHAT_COUNT_QUERY_KEY,
  GET_USER_CHAT_DETAILS_QUERY_KEY,
} from "@/constants/query-keys";
import { useSelectedShop } from "@/hooks/use-selected-shop";
import {
  IChat,
  IChatParams,
  IPaginatedChatResponse,
  UnseenCount,
} from "@/types/IChat";
import { IPaginatedResponse } from "@/types/IPaginatedResponse";
import { fetcher } from "@/utils/fetcher";

export const useGetUnSeenCounts = () => {
  const { selectedShop } = useSelectedShop();
  return useQuery({
    queryKey: [
      GET_UNSEEN_CHAT_COUNT_QUERY_KEY,
      { shopId: selectedShop?.shopId },
    ],
    queryFn: async () =>
      await fetcher<UnseenCount>({
        url: `/shop-message/unread/${selectedShop?.shopId}`,
      }),
    refetchInterval: 30000,
    enabled: !!selectedShop?.shopId,
  });
};

export const useGetMessages = (params?: IChatParams) => {
  const { selectedShop } = useSelectedShop();
  return useInfiniteQuery({
    queryKey: [
      GET_ALL_USER_CHAT_QUERY_KEY,
      { shopId: selectedShop?.shopId, params },
    ],
    queryFn: async ({ pageParam = 0 }) =>
      await fetcher<IPaginatedResponse<IChat>>({
        url: "/shop-message/shop",
        params: { ...params, page: pageParam, shopId: selectedShop?.shopId },
      }),
    initialPageParam: 0,
    getNextPageParam: (page) => (page.last ? undefined : page.pageNumber + 1),
    enabled: !!selectedShop?.shopId,
  });
};

export const useGetUserMessagesById = (
  userId: number,
  params?: IChatParams,
) => {
  const { selectedShop } = useSelectedShop();
  return useInfiniteQuery({
    queryKey: [
      GET_USER_CHAT_DETAILS_QUERY_KEY,
      { shopId: selectedShop?.shopId, params, userId },
    ],
    queryFn: async ({ pageParam = 0 }) =>
      await fetcher<IPaginatedChatResponse>({
        url: `/shop-message/shop/${userId}`,
        params: {
          ...params,
          size: 20,
          page: pageParam,
          shopId: selectedShop?.shopId,
        },
      }),
    initialPageParam: 0,
    getNextPageParam: (page) => (page.last ? undefined : page.pageNumber + 1),
    enabled: !!selectedShop?.shopId && !!userId,
  });
};
