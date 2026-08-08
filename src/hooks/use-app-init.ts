import { useLoading } from "@/context/auth-provider";

import { getUser } from "@/queries/auth-query";
import { useSelectedShop } from "./use-selected-shop";
import { useUser } from "./use-user";

export const useAppInit = () => {
  const { setUser } = useUser();
  const { setSelectedShop, selectedShop: shop } = useSelectedShop();
  const { setLoading } = useLoading();

  const initApp = () => {
    setLoading(true);
    getUser()
      .then((user) => {
        setUser(user);
        const shopId = shop?.shopId || 0;

        if (shop) {
          const shopFromUser = user.shopDetails.find(
            (shop) => shop.shopId === shopId,
          );
          if (shopFromUser) {
            setSelectedShop(shopFromUser);
          } else {
            setSelectedShop(user.shopDetails?.[0]);
          }
        } else {
          setSelectedShop(user.shopDetails?.[0]);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return { initApp };
};
