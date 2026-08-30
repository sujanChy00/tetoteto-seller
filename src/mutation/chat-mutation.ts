import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { GET_USER_CHAT_DETAILS_QUERY_KEY } from "@/constants/query-keys";
import { useLanguage } from "@/hooks/use-language";
import { useSelectedShop } from "@/hooks/use-selected-shop";
import {
  IChatMessage,
  IMessageInput,
  IPaginatedChatResponse,
} from "@/types/IChat";
import { IGeneralResponse } from "@/types/IGeneral";
import { addLocalFileToFormData } from "@/utils/add-local-file-to-formdata";
import { fetcher } from "@/utils/fetcher";
import { errorToast } from "@/utils/toast";

export const useDeleteMessage = () => {
  const queryClient = useQueryClient();
  const { t } = useLanguage();

  return useMutation({
    mutationFn: async (id: number) =>
      await fetcher<IGeneralResponse>({
        url: `/shop-message/${id}`,
        method: "DELETE",
      }),

    onMutate: async (messageId) => {
      await queryClient.cancelQueries({
        queryKey: [GET_USER_CHAT_DETAILS_QUERY_KEY],
      });

      const queries = queryClient.getQueriesData<
        InfiniteData<IPaginatedChatResponse>
      >({
        queryKey: [GET_USER_CHAT_DETAILS_QUERY_KEY],
      });

      const previousQueries = queries.map(([queryKey, data]) => ({
        queryKey,
        data,
      }));

      queryClient.setQueriesData<InfiniteData<IPaginatedChatResponse>>(
        {
          queryKey: [GET_USER_CHAT_DETAILS_QUERY_KEY],
        },
        (oldData) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            pages: oldData.pages.map((page) => ({
              ...page,
              content: page.content.filter(
                (message) => message.id !== messageId,
              ),
            })),
          };
        },
      );

      return { previousQueries };
    },

    onError: (error, _, context) => {
      context?.previousQueries.forEach(({ queryKey, data }) => {
        queryClient.setQueryData(queryKey, data);
      });

      errorToast({
        title: t("error"),
        description: error.message,
      });
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [GET_USER_CHAT_DETAILS_QUERY_KEY],
      });

      queryClient.invalidateQueries({
        queryKey: ["Chat"],
      });
    },
  });
};

export const useSendMessage = () => {
  const { selectedShop } = useSelectedShop();
  const queryClient = useQueryClient();
  const { t } = useLanguage();
  return useMutation({
    mutationFn: async (data: IMessageInput) => {
      const { userId, text, image, itemId } = data;
      const formData = new FormData();
      if (text) formData.append("text", text.trim());
      if (itemId) formData.append("itemId", itemId);
      formData.append("userId", String(userId));
      if (image) {
        if (typeof image === "string") {
          addLocalFileToFormData(image, formData, "image");
        } else {
          formData.append("image", image);
        }
      }
      // capture and return the created message — see note below
      const response = await fetcher<IChatMessage>({
        url: `/shop-message/${selectedShop?.shopId}`,
        method: "POST",
        data: formData,
        headers: { "content-type": "multipart/form-data" },
      });
      return response;
    },

    onMutate: async (variables) => {
      await queryClient.cancelQueries({
        queryKey: [GET_USER_CHAT_DETAILS_QUERY_KEY],
      });
      const previousData = queryClient.getQueriesData({
        queryKey: [GET_USER_CHAT_DETAILS_QUERY_KEY],
      });

      // generated internally — callers never need to know this exists
      const tempId = `temp-${Date.now()}-${Math.random().toString(36).slice(2)}`;

      const optimisticMsg: IChatMessage = {
        id: tempId,
        text: variables.text,
        image:
          typeof variables.image === "string" ? variables.image : undefined,
        user: false,
        admin: false,
        createdAt: new Date().toISOString(),
        item: variables.item as any,
        sending: true,
      };

      queryClient.setQueriesData<InfiniteData<IPaginatedChatResponse>>(
        {
          queryKey: [GET_USER_CHAT_DETAILS_QUERY_KEY],
          predicate: (query) =>
            query.queryKey[0] === GET_USER_CHAT_DETAILS_QUERY_KEY &&
            (query.queryKey[1] as any)?.userId === variables.userId,
        },
        (old) => {
          if (!old) return old;
          const newPages = [...old.pages];
          if (newPages.length > 0) {
            newPages[0] = {
              ...newPages[0],
              content: [optimisticMsg, ...newPages[0].content],
            };
          }
          return { ...old, pages: newPages };
        },
      );

      return { previousData, tempId };
    },

    // Reconcile the SAME key in place — no invalidate needed for the happy path.
    onSuccess: (serverMessage, variables, context) => {
      if (!serverMessage || !context?.tempId) return;
      queryClient.setQueriesData<InfiniteData<IPaginatedChatResponse>>(
        {
          queryKey: [GET_USER_CHAT_DETAILS_QUERY_KEY],
          predicate: (query) =>
            query.queryKey[0] === GET_USER_CHAT_DETAILS_QUERY_KEY &&
            (query.queryKey[1] as any)?.userId === variables.userId,
        },
        (old) => {
          if (!old) return old;
          const newPages = old.pages.map((page) => ({
            ...page,
            content: page.content.map((msg) =>
              msg.id === context.tempId
                ? { ...serverMessage, sending: false }
                : msg,
            ),
          }));
          return { ...old, pages: newPages };
        },
      );
    },

    onError(error, _, context) {
      if (context?.previousData) {
        context.previousData.forEach(([queryKey, data]) => {
          queryClient.setQueryData(queryKey, data);
        });
      }
      // only resync from server when the local cache might be wrong
      queryClient.invalidateQueries({
        queryKey: [GET_USER_CHAT_DETAILS_QUERY_KEY],
      });
      errorToast({ title: t("error"), description: error.message });
    },

    // no onSettled — the happy path is fully reconciled by onSuccess above
  });
};
