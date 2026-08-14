import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  GET_ALL_SHIPPING_COMPANY_QUERY_KEY,
  GET_ALL_SHIPPING_FEE_QUERY_KEY,
} from "@/constants/query-keys";
import { useHaptics } from "@/hooks/use-haptics";
import { useLanguage } from "@/hooks/use-language";
import { useSelectedShop } from "@/hooks/use-selected-shop";
import { useUser } from "@/hooks/use-user";
import { getUser } from "@/queries/auth-query";
import { ShopFormValues } from "@/schema/shop-schema";
import { IGeneralResponse } from "@/types/IGeneral";
import { IProfile } from "@/types/IProfile";
import { IshopDetails } from "@/types/IShop";
import { fetcher } from "@/utils/fetcher";
import { toast } from "@/utils/toast";

export const useResetShop = ({ onSuccess }: { onSuccess?: () => void }) => {
  const queryClient = useQueryClient();
  const haptics = useHaptics();
  const { selectedShop } = useSelectedShop();
  const { t } = useLanguage();
  return useMutation({
    mutationFn: async (companyId: number) =>
      await fetcher<IGeneralResponse>({
        url: `/shipping/shop/${selectedShop?.shopId}/reset?company=${companyId}`,
        method: "PUT",
      }),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [
          GET_ALL_SHIPPING_COMPANY_QUERY_KEY,
          GET_ALL_SHIPPING_FEE_QUERY_KEY,
        ],
      });
      toast.success(t("operation_successfull"), {
        description: data.message,
      });
      onSuccess?.();
    },
    onError(error) {
      haptics("error");
      toast.error(t("error"), {
        description: error.message,
      });
    },
  });
};

export const useUpdateShopLegalInfo = () => {
  const haptics = useHaptics();
  const queryClient = useQueryClient();
  const { t } = useLanguage();

  return useMutation({
    mutationFn: async ({ body, shopId }: { body: string; shopId: number }) =>
      await fetcher<IshopDetails>({
        url: `/shop/${shopId}`,
        method: "PUT",
        data: { shopInfo: body },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ShopDetails"] });
      toast.success(t("operation_successfull"), {
        description: "Shop legal information updated successfully",
      });
    },
    onError(error) {
      haptics("error");
      toast.error(t("error"), {
        description: error.message,
      });
    },
  });
};

export const useUpdateShop = () => {
  const haptics = useHaptics();
  const queryClient = useQueryClient();
  const { setUser } = useUser();
  const { t } = useLanguage();
  return useMutation({
    mutationFn: async ({
      data,
      shopId,
    }: {
      shopId: number;
      data: ShopFormValues;
    }) =>
      await fetcher<IGeneralResponse>({
        url: `/shop/${shopId}`,
        method: "PUT",
        data,
      }),
    onSuccess: (data) => {
      getUser().then((user) => setUser(user));
      queryClient.invalidateQueries({ queryKey: ["ShopDetails"] });
      toast.success(t("operation_successfull"), {
        description: data.message,
      });
    },
    onError(error) {
      haptics("error");
      toast.error(t("error"), {
        description: error.message,
      });
    },
  });
};

export const useUpdateShopImage = () => {
  const queryClient = useQueryClient();
  const haptics = useHaptics();
  const { t } = useLanguage();
  return useMutation({
    mutationFn: async ({ image, shopId }: { shopId: string; image: string }) =>
      await fetcher<IProfile>({
        url: `/shop/shop-image/${shopId}`,
        method: "PATCH",
        data: { image_url: [image] },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ShopDetails"] });
      toast.success(t("operation_successfull"), {
        description: "Shop image updated successfully",
      });
    },
    onError(error) {
      haptics("error");
      toast.error(t("error"), {
        description: error.message,
      });
    },
  });
};
