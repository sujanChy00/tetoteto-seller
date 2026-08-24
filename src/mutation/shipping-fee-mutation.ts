import { GET_ALL_SHIPPING_FEE_QUERY_KEY } from "@/constants/query-keys";
import { ShippingFeeFormValues } from "@/form/shipping-fee/shipping-fee-schema";
import { useHaptics } from "@/hooks/use-haptics";
import { useLanguage } from "@/hooks/use-language";
import { useSelectedShop } from "@/hooks/use-selected-shop";
import { IGeneralResponse, mutationProps } from "@/types";
import { fetcher } from "@/utils/fetcher";
import { purifyObject } from "@/utils/purify-object";
import { errorToast, successToast } from "@/utils/toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateShippingFee = ({
  onSuccess,
  onError,
}: mutationProps<IGeneralResponse> = {}) => {
  const { t } = useLanguage();
  const haptics = useHaptics();
  const { selectedShop } = useSelectedShop();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (args: {
      shippingInfo: ShippingFeeFormValues;
      id: number;
    }) => {
      return await fetcher<IGeneralResponse>({
        url: `/shipping/seller/${args.id}/${selectedShop?.shopId}`,
        method: "PATCH",
        data: purifyObject(args.shippingInfo),
      });
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [GET_ALL_SHIPPING_FEE_QUERY_KEY],
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
