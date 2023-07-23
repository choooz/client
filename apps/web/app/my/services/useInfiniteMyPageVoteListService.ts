import { useInfiniteQuery } from "@tanstack/react-query";
import { useInfiniteScroll } from "hooks/useInfiniteScroll";
import { getMyPageVoteList, GetMyPageVoteListRequest } from "lib/apis/my";

import { reactQueryKeys } from "lib/queryKeys";

type Params = Omit<GetMyPageVoteListRequest, "page">;

// @Todo infinite service 합칠 수 있는 방법 고민하기
export default function useInfiniteMyPageVoteListService(params: Params) {
  const { data, fetchNextPage } = useInfiniteQuery(
    reactQueryKeys.voteList([params.voteType]),
    ({ pageParam }) => getMyPageVoteList({ ...params, page: pageParam?.page || 0 }),
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
