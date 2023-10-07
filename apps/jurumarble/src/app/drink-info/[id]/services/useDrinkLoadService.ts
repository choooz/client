import { useQuery } from "@tanstack/react-query";
import { getDrinkInfo } from "lib/apis/drink";
import { reactQueryKeys } from "lib/queryKeys";

export default function useDrinkLoadService(id: number) {
  const { data, isLoading, isError } = useQuery(
    reactQueryKeys.drinksInfo(id),
    () => getDrinkInfo(id),
    {
      enabled: !!id,
    },
  );

  return { data, isLoading, isError };
}
