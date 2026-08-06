import { useMMKVString } from "react-native-mmkv";

import {
    SASTO_SULAV_iNDIA,
    SASTO_SULAV_NEPAL,
    SELECTED_SHOP_KEY,
} from "@/constants/query-keys";
import { ISellerShopDetail } from "@/types/IProfile";
import { storage } from "@/utils/storage";

export const useSelectedShop = () => {
  const [shop, setShop] = useMMKVString(SELECTED_SHOP_KEY, storage);

  const selectedShop = JSON.parse(shop || "{}") as ISellerShopDetail | null;

  const setSelectedShop = (selectedShop: ISellerShopDetail | null) => {
    setShop(JSON.stringify(selectedShop));
  };

  const isIndianShop = selectedShop?.shopId === SASTO_SULAV_iNDIA;
  const isNepaliShop = selectedShop?.shopId === SASTO_SULAV_NEPAL;
  const isSastoSulavSelected =
    selectedShop?.shopId === SASTO_SULAV_NEPAL ||
    selectedShop?.shopId === SASTO_SULAV_iNDIA;

  return {
    selectedShop,
    setSelectedShop,
    isIndianShop,
    isNepaliShop,
    isSastoSulavSelected,
  };
};
