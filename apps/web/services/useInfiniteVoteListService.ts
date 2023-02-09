import { useInfiniteQuery } from "@tanstack/react-query";
import { getVoteListAPI } from "lib/apis/vote";
import { reactQueryKeys } from "lib/queryKeys";

// type PageParam = Partial<{ page: number }>;

export default function useInfiniteVoteListService(params: any) {
  const query = useInfiniteQuery(
    [reactQueryKeys.voteList()],
    ({ pageParam }) =>
      getVoteListAPI({
        ...params,
        page: pageParam?.page || 0,
      }),
    {
      cacheTime: 60000,
      getNextPageParam: ({ last, number }) => {
        if (last) return undefined;
        return {
          page: number + 1,
        };
      },
      keepPreviousData: true,
      staleTime: 60000,
    },
  );

  return query;
}
