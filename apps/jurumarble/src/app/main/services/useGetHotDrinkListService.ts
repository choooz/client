import { useQuery } from "@tanstack/react-query";
import { getHotDrinkList } from "lib/apis/drink";
import { queryKeys } from "lib/queryKeys";

const getQueryKey = () => [queryKeys.SEARCH_DRINK_LIST];

export default function useGetHotDrinkListService() {
  const { data } = useQuery(getQueryKey(), getHotDrinkList);

  return { data };
}
