import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Platform } from "react-native";

import {
  GET_ALL_ITEMS_INFINITE_QUERY_KEY,
  GET_ALL_ITEMS_QUERY_KEY,
  GET_ALL_RECOMMENDED_ITEMS_QUERY_KEY,
  GET_EXPIRED_ITEMS_QUERY_KEY,
  GET_HOME_DATA_QUERY_KEY,
  GET_IN_STOCK_ITEMS_INFINITE_QUERY_KEY,
  GET_IN_STOCK_ITEMS_QUERY_KEY,
  GET_ITEM_DETAILS_QUERY_KEY,
  GET_ITEM_VARIATIONS_QUERY_KEY,
  GET_LOW_STOCK_ITEMS_QUERY_KEY,
} from "@/constants/query-keys";
import { ItemVariationValues } from "@/form/item/item-variation-schema";
import { useHaptics } from "@/hooks/use-haptics";
import { useLanguage } from "@/hooks/use-language";
import { useSelectedShop } from "@/hooks/use-selected-shop";
import {
  AddImagesResponse,
  IItemAddBody,
  IItemAddRequest,
  IItemUpdateRequest,
  IItemVaritions,
} from "@/types";
import { IGeneralResponse, mutationProps } from "@/types/IGeneral";
import { addLocalFileToFormData } from "@/utils/add-local-file-to-formdata";
import { fetcher } from "@/utils/fetcher";
import { errorToast, successToast } from "@/utils/toast";

export const useToggleItemStatus = ({
  onSuccess,
  onError,
}: mutationProps<IGeneralResponse> = {}) => {
  const queryClient = useQueryClient();
  const { t } = useLanguage();
  const haptics = useHaptics();

  return useMutation({
    mutationFn: async (itemId: string) =>
      fetcher<IGeneralResponse>({
        url: `/item/toggle-disable/${itemId}`,
        method: "PATCH",
      }),
    onSuccess(data) {
      queryClient.invalidateQueries({
        queryKey: [GET_ALL_ITEMS_INFINITE_QUERY_KEY],
      });
      queryClient.invalidateQueries({ queryKey: [GET_ITEM_DETAILS_QUERY_KEY] });
      queryClient.invalidateQueries({
        queryKey: [GET_ALL_RECOMMENDED_ITEMS_QUERY_KEY],
      });
      queryClient.invalidateQueries({ queryKey: [GET_HOME_DATA_QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: [GET_ALL_ITEMS_QUERY_KEY] });
      successToast({
        title: t("operation_successfull"),
        description: data.message,
      });
      onSuccess?.(data);
    },
    onError(error) {
      haptics("error");
      errorToast({
        title: t("error"),
        description: error.message,
      });
      onError?.(error);
    },
  });
};

export const useAddRecommendedItems = ({
  onSuccess,
  onError,
}: mutationProps<IGeneralResponse> = {}) => {
  const queryClient = useQueryClient();
  const haptics = useHaptics();
  const { t } = useLanguage();

  return useMutation({
    mutationFn: async (args: { itemId: string }) =>
      await fetcher<IGeneralResponse>({
        url: `/recommended`,
        method: "POST",
        data: {
          itemId: args.itemId,
        },
      }),
    onSuccess(data) {
      queryClient.invalidateQueries({ queryKey: [GET_ALL_ITEMS_QUERY_KEY] });
      queryClient.invalidateQueries({
        queryKey: [GET_ALL_ITEMS_INFINITE_QUERY_KEY],
      });
      queryClient.invalidateQueries({ queryKey: [GET_HOME_DATA_QUERY_KEY] });
      successToast({
        title: t("operation_successfull"),
        description: data.message,
      });
      onSuccess?.(data);
    },
    onError(error) {
      haptics("error");
      errorToast({
        title: t("error"),
        description: error.message,
      });
      onError?.(error);
    },
  });
};

export const useRemoveRecommendedItems = ({
  onSuccess,
  onError,
}: mutationProps<IGeneralResponse> = {}) => {
  const queryClient = useQueryClient();
  const haptics = useHaptics();
  const { t } = useLanguage();
  return useMutation({
    mutationFn: async (args: { itemId: string }) =>
      await fetcher<IGeneralResponse>({
        url: `/recommended/${args.itemId}`,
        method: "DELETE",
      }),
    onSuccess(data) {
      queryClient.invalidateQueries({ queryKey: [GET_ALL_ITEMS_QUERY_KEY] });
      queryClient.invalidateQueries({
        queryKey: [GET_ALL_ITEMS_INFINITE_QUERY_KEY],
      });
      queryClient.invalidateQueries({ queryKey: [GET_HOME_DATA_QUERY_KEY] });
      queryClient.invalidateQueries({
        queryKey: [GET_ALL_RECOMMENDED_ITEMS_QUERY_KEY],
      });
      successToast({
        title: t("operation_successfull"),
        description: data.message,
      });
      onSuccess?.(data);
    },
    onError(error) {
      haptics("error");
      errorToast({
        title: t("error"),
        description: error.message,
      });
      onError?.(error);
    },
  });
};

export const useAddItem = ({
  onSuccess,
  onError,
}: mutationProps<IGeneralResponse> = {}) => {
  const { selectedShop } = useSelectedShop();
  const queryClient = useQueryClient();
  const haptics = useHaptics();
  const { t } = useLanguage();

  return useMutation({
    mutationFn: async ({ body }: IItemAddRequest) => {
      const { indianShop, ...rest } = body;
      return await fetcher<IGeneralResponse>({
        url: `/item`,
        method: "POST",
        data: {
          shopId: selectedShop?.shopId,
          ...rest,
        },
        params: {
          indianShop,
        },
      });
    },
    onSuccess(data) {
      queryClient.invalidateQueries({ queryKey: [GET_ALL_ITEMS_QUERY_KEY] });
      queryClient.invalidateQueries({
        queryKey: [GET_ALL_ITEMS_INFINITE_QUERY_KEY],
      });
      successToast({
        title: t("operation_successfull"),
        description: data.message,
      });
      onSuccess?.(data);
    },
    onError(error) {
      haptics("error");
      errorToast({
        title: t("error"),
        description: error.message,
      });
      onError?.(error);
    },
  });
};

export const useUpdateItem = ({
  onSuccess,
  onError,
}: mutationProps<IGeneralResponse> = {}) => {
  const queryClient = useQueryClient();
  const haptics = useHaptics();
  const { t } = useLanguage();
  return useMutation({
    mutationFn: async ({ body, itemId }: IItemUpdateRequest) => {
      const { item_images, ...data } = body;
      return await fetcher<IGeneralResponse>({
        url: `/item/${itemId}`,
        method: "PATCH",
        data,
      });
    },
    onSuccess(data) {
      queryClient.invalidateQueries({
        queryKey: [GET_ITEM_DETAILS_QUERY_KEY],
      });
      queryClient.invalidateQueries({ queryKey: [GET_ALL_ITEMS_QUERY_KEY] });
      queryClient.invalidateQueries({
        queryKey: [GET_LOW_STOCK_ITEMS_QUERY_KEY],
      });
      queryClient.invalidateQueries({
        queryKey: [GET_EXPIRED_ITEMS_QUERY_KEY],
      });
      queryClient.invalidateQueries({
        queryKey: [GET_ALL_ITEMS_INFINITE_QUERY_KEY],
      });
      queryClient.invalidateQueries({ queryKey: [GET_HOME_DATA_QUERY_KEY] });
      successToast({
        title: t("operation_successfull"),
        description: data.message,
      });
      onSuccess?.(data);
    },
    onError(error) {
      haptics("error");
      errorToast({
        title: t("error"),
        description: error.message,
      });
      onError?.(error);
    },
  });
};

export const useDeleteItem = ({
  onSuccess,
  onError,
}: mutationProps<IGeneralResponse> = {}) => {
  const queryClient = useQueryClient();
  const haptics = useHaptics();
  const { t } = useLanguage();
  return useMutation({
    mutationFn: async (itemId: string) =>
      await fetcher<IGeneralResponse>({
        url: `/item/${itemId}`,
        method: "DELETE",
      }),
    onSuccess(data: IGeneralResponse) {
      queryClient.invalidateQueries({ queryKey: [GET_ALL_ITEMS_QUERY_KEY] });
      queryClient.invalidateQueries({
        queryKey: [GET_ALL_ITEMS_INFINITE_QUERY_KEY],
      });
      queryClient.invalidateQueries({ queryKey: [GET_HOME_DATA_QUERY_KEY] });

      successToast({
        title: t("operation_successfull"),
        description: data.message,
      });
      onSuccess?.(data);
    },
    onError(error) {
      haptics("error");
      errorToast({
        title: t("error"),
        description: error.message,
      });
      onError?.(error);
    },
  });
};

export const useUpdateItemThumbnail = ({
  onSuccess,
  onError,
}: mutationProps<IGeneralResponse> = {}) => {
  const queryClient = useQueryClient();
  const haptics = useHaptics();
  const { t } = useLanguage();
  return useMutation({
    mutationFn: async (args: { img: string; id: string }) =>
      await fetcher<IGeneralResponse>({
        url: `/item/${args.id}`,
        method: "PATCH",
        data: {
          thumbnail_image: args.img,
        },
      }),
    onSuccess(data) {
      queryClient.invalidateQueries({ queryKey: [GET_ALL_ITEMS_QUERY_KEY] });
      queryClient.invalidateQueries({
        queryKey: [GET_ALL_ITEMS_INFINITE_QUERY_KEY],
      });
      queryClient.invalidateQueries({ queryKey: [GET_HOME_DATA_QUERY_KEY] });
      successToast({
        title: t("operation_successfull"),
        description: data.message,
      });
      onSuccess?.(data);
    },
    onError(error) {
      haptics("error");
      errorToast({
        title: t("error"),
        description: error.message,
      });
      onError?.(error);
    },
  });
};

export const useAddItemVaritaions = ({
  onSuccess,
  onError,
}: mutationProps<IItemVaritions[]> = {}) => {
  const queryClient = useQueryClient();
  const haptics = useHaptics();
  const { t } = useLanguage();
  return useMutation({
    mutationFn: async (args: { itemId: string; data: ItemVariationValues[] }) =>
      await fetcher<IItemVaritions[]>({
        url: `/items/${args.itemId}/variations`,
        method: "POST",
        data: args.data,
      }),
    onSuccess(data) {
      queryClient.invalidateQueries({ queryKey: [GET_ALL_ITEMS_QUERY_KEY] });
      queryClient.invalidateQueries({
        queryKey: [GET_ALL_ITEMS_INFINITE_QUERY_KEY],
      });
      queryClient.invalidateQueries({ queryKey: [GET_ITEM_DETAILS_QUERY_KEY] });
      successToast({
        title: t("operation_successfull"),
        description: "item variations added successfully",
      });
      onSuccess?.(data);
    },
    onError(error) {
      haptics("error");
      errorToast({
        title: t("error"),
        description: error.message,
      });
      onError?.(error);
    },
  });
};

export const useUpdateItemVariation = ({
  onSuccess,
  onError,
}: mutationProps<IItemVaritions[]> = {}) => {
  const queryClient = useQueryClient();
  const haptics = useHaptics();
  const { t } = useLanguage();
  return useMutation({
    mutationFn: async (args: {
      itemId: string;
      data: ItemVariationValues;
      variationname: string;
    }) =>
      await fetcher<IItemVaritions[]>({
        url: `/items/${args.itemId}/variations/${args.variationname}`,
        method: "PATCH",
        data: args.data,
      }),
    onSuccess(data) {
      queryClient.invalidateQueries({ queryKey: [GET_ALL_ITEMS_QUERY_KEY] });
      queryClient.invalidateQueries({
        queryKey: [GET_ALL_ITEMS_INFINITE_QUERY_KEY],
      });
      queryClient.invalidateQueries({ queryKey: [GET_ITEM_DETAILS_QUERY_KEY] });
      queryClient.invalidateQueries({
        queryKey: [GET_ITEM_VARIATIONS_QUERY_KEY],
      });
      successToast({
        title: t("operation_successfull"),
        description: "item variations updated successfully",
      });
      onSuccess?.(data);
    },
    onError(error) {
      haptics("error");
      errorToast({
        title: t("error"),
        description: error.message,
      });
      onError?.(error);
    },
  });
};

export const useDeleteItemVariation = ({
  onSuccess,
  onError,
}: mutationProps<IGeneralResponse> = {}) => {
  const queryClient = useQueryClient();
  const haptics = useHaptics();
  const { t } = useLanguage();
  return useMutation({
    mutationFn: async ({
      itemId,
      variationName,
    }: {
      itemId: string;
      variationName: string;
    }) =>
      await fetcher<IGeneralResponse>({
        url: `/items/${itemId}/variations/${variationName}`,
        method: "DELETE",
      }),
    onSuccess(data) {
      queryClient.invalidateQueries({ queryKey: [GET_ALL_ITEMS_QUERY_KEY] });
      queryClient.invalidateQueries({
        queryKey: [GET_ALL_ITEMS_INFINITE_QUERY_KEY],
      });
      queryClient.invalidateQueries({ queryKey: [GET_ITEM_DETAILS_QUERY_KEY] });
      successToast({
        title: t("operation_successfull"),
        description: data.message,
      });
      onSuccess?.(data);
    },
    onError(error) {
      haptics("error");
      errorToast({
        title: t("error"),
        description: error.message,
      });
      onError?.(error);
    },
  });
};

export const useCopyItem = ({
  onSuccess,
  onError,
}: mutationProps<IGeneralResponse> = {}) => {
  const queryClient = useQueryClient();
  const { selectedShop } = useSelectedShop();
  const haptics = useHaptics();
  const { t } = useLanguage();
  return useMutation({
    mutationFn: async ({
      itemId,
      data,
    }: {
      itemId: string;
      data: IItemAddBody & {
        newImage: boolean;
      };
    }) => {
      const { indianShop, ...body } = data;
      return await fetcher<IGeneralResponse>({
        url: `/item/copy/${itemId}`,
        method: "POST",
        data: {
          shopId: selectedShop?.shopId,
          ...body,
        },
        params: {
          indianShop,
        },
      });
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [GET_ALL_ITEMS_QUERY_KEY] });
      queryClient.invalidateQueries({
        queryKey: [GET_ALL_ITEMS_INFINITE_QUERY_KEY],
      });
      successToast({
        title: t("operation_successfull"),
        description: data.message,
      });
      onSuccess?.(data);
    },
    onError(error) {
      haptics("error");
      errorToast({
        title: t("error"),
        description: error.message,
      });
      onError?.(error);
    },
  });
};

export const useDeleteItemImage = ({
  onSuccess,
  onError,
}: mutationProps<IGeneralResponse, string> = {}) => {
  const haptics = useHaptics();
  const { t } = useLanguage();
  return useMutation({
    mutationFn: async (image: string) => {
      const formData = new FormData();
      formData.append("image", image);
      return await fetcher<IGeneralResponse>({
        url: "/image/temp",
        method: "DELETE",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
    onSuccess: (data, variables) => {
      successToast({
        title: t("operation_successfull"),
        description: data.message,
      });
      onSuccess?.(data, variables);
    },
    onError: (error) => {
      haptics("error");
      errorToast({
        title: t("error"),
        description: error.message,
      });
      onError?.(error);
    },
  });
};

export const useUploadItemImage = ({
  onSuccess,
  onError,
}: mutationProps<string[]> = {}) => {
  const { t } = useLanguage();
  const haptics = useHaptics();
  return useMutation({
    mutationFn: async (uris: string[]) => {
      const formData = new FormData();
      try {
        uris.forEach((uri) => addLocalFileToFormData(uri, formData, "files"));
      } catch (error) {
        haptics("error");
        errorToast({
          title: t("error"),
          description: error instanceof Error ? error.message : String(error),
        });
        throw error;
      }
      return await fetcher<string[]>({
        url: "/image/temp",
        method: "POST",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
    onSuccess: (data) => {
      onSuccess?.(data);
    },
    onError: (error) => {
      haptics("error");
      errorToast({
        title: t("error"),
        description: error.message,
      });
      onError?.(error);
    },
  });
};

export const useAddItemImages = ({
  onSuccess,
  onError,
}: mutationProps<AddImagesResponse> = {}) => {
  const queryClient = useQueryClient();
  const haptics = useHaptics();
  const { t } = useLanguage();

  return useMutation({
    mutationFn: async ({
      itemId,
      images,
    }: {
      itemId: string;
      images: string[];
    }) => {
      const formData = new FormData();

      if (Platform.OS == "web") {
        await Promise.all(
          images.map(async (uri, index) => {
            const blob = await uriToBlob(uri);
            formData.append("images", blob, `image_${index}.jpg`);
          }),
        );
      } else {
        images.forEach((uri) =>
          addLocalFileToFormData(uri, formData, "images"),
        );
      }

      return await fetcher<AddImagesResponse>({
        url: `/item/image/${itemId}`,
        method: "POST",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [GET_ITEM_DETAILS_QUERY_KEY],
      });
      queryClient.invalidateQueries({ queryKey: [GET_ALL_ITEMS_QUERY_KEY] });
      queryClient.invalidateQueries({
        queryKey: [GET_ALL_ITEMS_INFINITE_QUERY_KEY],
      });
      queryClient.invalidateQueries({ queryKey: [GET_HOME_DATA_QUERY_KEY] });
      successToast({
        title: t("operation_successfull"),
        description: "Images added successfully",
      });
      onSuccess?.(data);
    },
    onError: (error) => {
      haptics("error");
      errorToast({
        title: t("error"),
        description: error.message,
      });
      onError?.(error);
    },
  });
};

export const useUpdateItemImages = ({
  onSuccess,
  onError,
}: mutationProps<AddImagesResponse> = {}) => {
  const queryClient = useQueryClient();
  const haptics = useHaptics();
  const { t } = useLanguage();
  return useMutation({
    mutationFn: async ({
      itemId,
      ...data
    }: {
      itemId: string;
      images: string[];
      thumbnailImage: string;
    }) => {
      return await fetcher<AddImagesResponse>({
        url: `/item/image/${itemId}`,
        method: "PUT",
        data,
      });
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [GET_ITEM_DETAILS_QUERY_KEY],
      });
      queryClient.invalidateQueries({ queryKey: [GET_ALL_ITEMS_QUERY_KEY] });
      queryClient.invalidateQueries({
        queryKey: [GET_ALL_ITEMS_INFINITE_QUERY_KEY],
      });
      queryClient.invalidateQueries({ queryKey: [GET_HOME_DATA_QUERY_KEY] });
      successToast({
        title: t("operation_successfull"),
        description: "Images updated successfully",
      });
      onSuccess?.(data);
    },
    onError: (error) => {
      haptics("error");
      errorToast({
        title: t("error"),
        description: error.message,
      });
      onError?.(error);
    },
  });
};

const uriToBlob = (uri: string): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = () => {
      resolve(xhr.response);
    };
    xhr.onerror = () => {
      reject(new Error("Could not convert URI to Blob"));
    };
    xhr.responseType = "blob";
    xhr.open("GET", uri, true);
    xhr.send(null);
  });
};

export const useUpdateItemStock = ({
  onSuccess,
  onError,
}: mutationProps<IGeneralResponse> = {}) => {
  const queryClient = useQueryClient();
  const haptics = useHaptics();
  const { t } = useLanguage();
  return useMutation({
    mutationFn: async ({
      itemId,
      stock,
    }: {
      itemId: string;
      stock: number;
    }) => {
      return await fetcher<IGeneralResponse>({
        url: `/item/change-stock/${itemId}`,
        method: "PATCH",
        params: {
          stock,
        },
      });
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [GET_IN_STOCK_ITEMS_INFINITE_QUERY_KEY],
      });
      queryClient.invalidateQueries({
        queryKey: [GET_IN_STOCK_ITEMS_QUERY_KEY],
      });
      queryClient.invalidateQueries({
        queryKey: [GET_LOW_STOCK_ITEMS_QUERY_KEY],
      });
      successToast({
        title: t("operation_successfull"),
        description: data.message,
      });
      onSuccess?.(data);
    },
    onError: (error) => {
      haptics("error");
      errorToast({
        title: t("error"),
        description: error.message,
      });
      onError?.(error);
    },
  });
};
