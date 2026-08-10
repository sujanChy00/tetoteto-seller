import { useLocalSearchParams, useRouter } from "expo-router";

export const useSortItems = () => {
  const router = useRouter();
  const params = useLocalSearchParams<{
    sort?: string;
    order?: string;
    query?: string;
  }>();
  const onSort = (text: string) => {
    const order = !params?.order ? "0" : params?.order == "0" ? "1" : "";
    const sort = order ? text : "";
    router.setParams({ sort, order });
  };

  return { onSort, params, router };
};
