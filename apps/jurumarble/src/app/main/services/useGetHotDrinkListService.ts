import { useQuery } from "@tanstack/react-query";
import { getHotDrinkList } from "lib/apis/drink";
import { queryKeys } from "lib/queryKeys";
import { hotDrinkListQueryKey } from "./queryKey";

export default function useGetHotDrinkListService() {
  const { data } = useQuery([hotDrinkListQueryKey], getHotDrinkList);

  return { data };
}
