import { useInfiniteQuery } from "@tanstack/react-query";
import { getVoteDrinkList } from "lib/apis/vote";
import { queryKeys } from "lib/queryKeys";

type SearchVoteDrinkServiceProps = Exclude<Parameters<typeof getVoteDrinkList>[0], undefined>;

const getQueryKey = (params: SearchVoteDrinkServiceProps) => [
  queryKeys.SEARCH_VOTE_DRINK_LIST,
  { ...params },
];

export default function useVoteDrinkService(params: SearchVoteDrinkServiceProps) {
  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery(
    getQueryKey(params),
    ({ pageParam }) =>
      getVoteDrinkList({
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

  const voteDrinkList = data?.pages.flatMap((page) => page.content) ?? [];

  return { voteDrinkList, fetchNextPage, hasNextPage };
}
