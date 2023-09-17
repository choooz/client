import { useInfiniteQuery } from "@tanstack/react-query";
import { getDrinkList } from "lib/apis/drink";
import { queryKeys } from "lib/queryKeys";

type SearchDrinkServiceProps = Exclude<Parameters<typeof getDrinkList>[0], undefined>;

const getQueryKey = (params: SearchDrinkServiceProps) => [
  queryKeys.SEARCH_DRINK_LIST,
  { ...params },
];

export default function useGetDrinkListService(params: SearchDrinkServiceProps) {
  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery(
    getQueryKey(params),
    ({ pageParam }) =>
      getDrinkList({
        ...params,
        page: pageParam?.page || params.page,
      }),
    {
      getNextPageParam: ({ last, number }) => {
        if (last) return undefined;
        return {
          page: number + 1,
        };
      },
      keepPreviousData: true,
    },
  );

  const drinkList = data?.pages.flatMap((page) => page.content) ?? [];

  return { drinkList, fetchNextPage, hasNextPage };
}
