import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  GET_ALL_ORDERS_QUERY_KEY,
  GET_HOME_DATA_QUERY_KEY,
  GET_ORDER_DETAILS_QUERY_KEY,
} from "@/constants/query-keys";
import { useHaptics } from "@/hooks/use-haptics";
import { useLanguage } from "@/hooks/use-language";

import {
  ShipOrderFormValues,
  ShippingAddressFormValues,
} from "@/form/order/order-schema";
import { IGeneralResponse, mutationProps } from "@/types/IGeneral";
import { IOrderProgress, ITransactionById } from "@/types/ITransaction";
import { fetcher } from "@/utils/fetcher";
import { errorToast, successToast } from "@/utils/toast";

export const useApproveAddressUpdate = ({
  onSuccess,
  onError,
}: mutationProps<IGeneralResponse> = {}) => {
  const haptics = useHaptics();
  const queryClient = useQueryClient();
  const { t } = useLanguage();
  return useMutation({
    mutationFn: async (orderId: number) => {
      return await fetcher<IGeneralResponse>({
        url: `/order/address/approve/${orderId}`,
        method: "POST",
      });
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [GET_ORDER_DETAILS_QUERY_KEY],
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

export const useCancelAddressUpdate = ({
  onSuccess,
  onError,
}: mutationProps<IGeneralResponse> = {}) => {
  const queryClient = useQueryClient();
  const haptics = useHaptics();
  const { t } = useLanguage();
  return useMutation({
    mutationFn: async (orderId: number) => {
      return await fetcher<IGeneralResponse>({
        url: `/order/address/${orderId}`,
        method: "DELETE",
      });
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [GET_ORDER_DETAILS_QUERY_KEY],
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

export const useUpdateShippingAddress = ({
  onSuccess,
  onError,
}: mutationProps<IGeneralResponse> = {}) => {
  const haptics = useHaptics();
  const { t } = useLanguage();

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      data,
      orderid,
    }: {
      orderid: number;
      data: Omit<ShippingAddressFormValues, "prefecture">;
    }) =>
      await fetcher<IGeneralResponse>({
        url: `/order/address/${orderid}`,
        method: "POST",
        data,
      }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [GET_ORDER_DETAILS_QUERY_KEY],
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

export const useChangeShippingAddress = ({
  onSuccess,
  onError,
}: mutationProps<IGeneralResponse> = {}) => {
  const haptics = useHaptics();
  const { t } = useLanguage();

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      data,
      orderid,
    }: {
      orderid: number;
      data: Omit<ShippingAddressFormValues, "prefecture">;
    }) =>
      await fetcher<IGeneralResponse>({
        url: `/order/change-address/${orderid}`,
        method: "PUT",
        data,
      }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [GET_ORDER_DETAILS_QUERY_KEY],
      });
      onSuccess?.(data);
      successToast({
        title: t("operation_successfull"),
        description: data.message,
      });
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

export const useUpdateTransaction = ({
  onSuccess,
  onError,
}: mutationProps<IGeneralResponse> = {}) => {
  const queryClient = useQueryClient();
  const haptics = useHaptics();
  const { t } = useLanguage();
  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: number;
      data: ShipOrderFormValues;
    }) => {
      return await fetcher<IGeneralResponse>({
        url: `/order/ship/${id}`,
        method: "PUT",
        data,
      });
    },
    onSuccess(data) {
      queryClient.invalidateQueries({
        queryKey: [GET_ALL_ORDERS_QUERY_KEY],
      });
      queryClient.invalidateQueries({ queryKey: [GET_HOME_DATA_QUERY_KEY] });
      queryClient.invalidateQueries({
        queryKey: [GET_ORDER_DETAILS_QUERY_KEY],
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

export const useChangeOrderStatus = ({
  onSuccess,
  onError,
}: mutationProps<ITransactionById> = {}) => {
  const queryClient = useQueryClient();
  const haptics = useHaptics();
  const { t } = useLanguage();

  return useMutation({
    mutationFn: async ({
      orderId,
      changeTo,
    }: {
      orderId: number;
      changeTo: IOrderProgress;
    }) => {
      return await fetcher<ITransactionById>({
        url: `/order/change-status/${orderId}`,
        method: "PATCH",
        params: {
          changeTo,
        },
      });
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: [GET_ORDER_DETAILS_QUERY_KEY],
      });
      const message =
        variables.changeTo == "SELLER_ACKNOWLEDGED"
          ? t("order_changes_accepted_message")
          : t("order_change_request_message");

      successToast({
        title: t("operation_successfull"),
        description: message,
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
