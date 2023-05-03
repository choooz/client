import { useInfiniteQuery } from "@tanstack/react-query";
import { useInfiniteScroll } from "hooks/useInfiniteScroll";
import { getSearchVoteListAPI, GetSearchVoteListRequest } from "lib/apis/vote";
import { reactQueryKeys } from "lib/queryKeys";

type Params = Omit<GetSearchVoteListRequest, "page">;

export default function useInfiniteSearchResultService(params: Params) {
  const { data, fetchNextPage } = useInfiniteQuery(
    reactQueryKeys.voteList([params.sortBy, params.category, params.keyword]),
    ({ pageParam }) =>
      getSearchVoteListAPI({
        ...params,
        page: pageParam?.page || 0,
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

  const [subscribe] = useInfiniteScroll(fetchNextPage);

  const voteList = data?.pages.flatMap((page) => page.content) ?? [];

  return { voteList, subscribe };
}
