import { useInfiniteQuery } from "@tanstack/react-query";
import { useInfiniteScroll } from "hooks/useInfiniteScroll";
import { getVoteListAPI, GetVoteListRequest } from "lib/apis/vote";
import { reactQueryKeys } from "lib/queryKeys";

// type PageParam = Partial<{ page: number }>;

export default function useInfiniteVoteListService(params: GetVoteListRequest) {
  const { data, fetchNextPage } = useInfiniteQuery(
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

  const [subscribe] = useInfiniteScroll(fetchNextPage);

  const voteList = data?.pages.flatMap((page) => page.content) ?? [];

  return { voteList, subscribe };
}
