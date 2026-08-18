import { GET_SHOP_AVAILABLE_DELIVERY_TIME_SLOTS_QUERY_KEY } from "@/constants/query-keys";
import { useHaptics } from "@/hooks/use-haptics";
import { useLanguage } from "@/hooks/use-language";
import { useSelectedShop } from "@/hooks/use-selected-shop";
import { IGeneralResponse, mutationProps } from "@/types";
import { fetcher } from "@/utils/fetcher";
import { errorToast, successToast } from "@/utils/toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateShopDeliveryTime = ({
  onSuccess,
  onError,
}: mutationProps<IGeneralResponse> = {}) => {
  const { selectedShop } = useSelectedShop();
  const { t } = useLanguage();
  const haptic = useHaptics();

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: { shippingCompanyId: number | null }) =>
      await fetcher<IGeneralResponse>({
        url: `/delivery-time/${selectedShop?.shopId}`,
        data,
        method: "PATCH",
      }),
    onSuccess(data) {
      queryClient.invalidateQueries({
        queryKey: [GET_SHOP_AVAILABLE_DELIVERY_TIME_SLOTS_QUERY_KEY],
      });
      successToast({
        title: t("operation_successfull"),
        description: t("delivery_update_success_message"),
      });
      onSuccess?.(data);
    },
    onError(error) {
      haptic("error");
      errorToast({
        title: t("error"),
        description: error.message,
      });
      onError?.(error);
    },
  });
};
