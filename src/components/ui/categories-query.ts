import { useQuery } from "@tanstack/react-query";

import {
  GET_ALL_CATEGORIES_BY_COUNTRY_AND_LANGUAGE_QUERY_KEY,
  GET_ALL_CATEGORIES_QUERY_KEY,
} from "@/constants/query-keys";
import { useLanguage } from "@/hooks/use-language";
import { useSelectedShop } from "@/hooks/use-selected-shop";
import { useUser } from "@/hooks/use-user";
import { ICategory } from "@/types/ICategory";
import { fetcher } from "@/utils/fetcher";

export const useGetAllCategories = () => {
  const { selectedShop } = useSelectedShop();
  const { language } = useLanguage();

  return useQuery<ICategory[]>({
    queryKey: [GET_ALL_CATEGORIES_QUERY_KEY, language, selectedShop?.shopId],
    queryFn: async () =>
      await fetcher({
        url: "/category",
        params: {
          sellerId: selectedShop?.shopId,
        },
      }),
  });
};

export const useGetAllCategoriesByCountryAndLanguage = () => {
  const { language } = useLanguage();
  const { user } = useUser();
  const { selectedShop } = useSelectedShop();
  return useQuery<ICategory[]>({
    queryKey: [GET_ALL_CATEGORIES_BY_COUNTRY_AND_LANGUAGE_QUERY_KEY],
    queryFn: async () =>
      await fetcher({
        url: `/category`,
        params: {
          country: user?.profileDetails.shopAssistantCountry,
          language,
          sellerId: selectedShop?.shopId,
        },
      }),
  });
};
