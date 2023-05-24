import { useInfiniteQuery } from "@tanstack/react-query";
import { useInfiniteScroll } from "hooks/useInfiniteScroll";
import { getVoteListAPI, GetVoteListRequest } from "lib/apis/vote";
import { reactQueryKeys } from "lib/queryKeys";

type Params = Omit<GetVoteListRequest, "page">;

export default function useInfiniteVoteListService(params: Params) {
  const { data, fetchNextPage } = useInfiniteQuery(
    reactQueryKeys.voteList([params.sortBy, params.category]),
    ({ pageParam }) =>
      getVoteListAPI({
        ...params,
        page: pageParam?.page || 0,
        category: params.category,
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
