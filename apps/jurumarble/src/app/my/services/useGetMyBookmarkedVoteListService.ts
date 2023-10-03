import { useInfiniteQuery } from "@tanstack/react-query";
import { useInfiniteScroll } from "@monorepo/hooks";
import { getMyBookmarkedVoteList } from "lib/apis/my";
import { queryKeys } from "lib/queryKeys";

type GetMyBookmarkedVoteListServiceProps = Exclude<
  Parameters<typeof getMyBookmarkedVoteList>[0],
  undefined
>;

const getMyBookmarkedVoteQueryKey = (params: GetMyBookmarkedVoteListServiceProps) => [
  queryKeys.MY_BOOKMARKED_VOTE,
  params,
];

export default function useGetMyBookmarkedVoteListService(
  params: GetMyBookmarkedVoteListServiceProps,
) {
  const { data, fetchNextPage } = useInfiniteQuery(
    getMyBookmarkedVoteQueryKey(params),
    ({ pageParam }) => getMyBookmarkedVoteList({ ...params, page: pageParam?.page || 0 }),
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

  const myVoteList = data?.pages.flatMap((page) => page.content) ?? [];

  return { myVoteList, subscribe };
}
