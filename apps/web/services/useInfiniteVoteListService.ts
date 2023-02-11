import { useInfiniteQuery } from "@tanstack/react-query";
import { useInfiniteScroll } from "hooks/useInfiniteScroll";
import { getVoteListAPI } from "lib/apis/vote";
import { reactQueryKeys } from "lib/queryKeys";

// type PageParam = Partial<{ page: number }>;

interface Params {
  page?: number;
  size: number;
  sortBy: string;
}

export default function useInfiniteVoteListService(params: Params) {
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

  // @Note flatMap을 안쓰면 무한 스크롤이 동작하지 않는데 그 이유를 모르겠다.
  const voteList = data?.pages.flatMap((page) => page.content) ?? [];

  return { voteList, subscribe };
}
