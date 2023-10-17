import { useQuery } from "@tanstack/react-query";
import { getHotDrinkList } from "lib/apis/drink";

import { hotDrinkListQueryKey } from "./queryKey";

export default function useGetHotDrinkListService() {
  const { data } = useQuery([hotDrinkListQueryKey], getHotDrinkList);

  return { data };
}
