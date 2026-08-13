import { GET_SHOP_AVAILABLE_DELIVERY_TIME_SLOTS_QUERY_KEY } from "@/constants/query-keys";
import { useHaptics } from "@/hooks/use-haptics";
import { useLanguage } from "@/hooks/use-language";
import { useSelectedShop } from "@/hooks/use-selected-shop";
import { fetcher } from "@/utils/fetcher";
import { toast } from "@/utils/toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateShopDeliveryTime = () => {
  const { selectedShop } = useSelectedShop();
  const { t } = useLanguage();
  const haptic = useHaptics();

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: { shippingCompanyId: number | null }) =>
      await fetcher({
        url: `/delivery-time/${selectedShop?.shopId}`,
        data,
        method: "PATCH",
      }),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: [GET_SHOP_AVAILABLE_DELIVERY_TIME_SLOTS_QUERY_KEY],
      });
      toast.success(t("operation_successfull"), {
        description: t("delivery_update_success_message"),
      });
    },
    onError(error) {
      haptic("error");
      toast.error(t("error"), {
        description: error.message,
      });
    },
  });
};
