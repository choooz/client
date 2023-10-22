import { useInfiniteScroll } from '@monorepo/hooks';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getMyCreatedVoteList } from 'lib/apis/my';
import { queryKeys } from 'lib/queryKeys';

type GetMyCreatededVoteListServiceProps = Exclude<
  Parameters<typeof getMyCreatedVoteList>[0],
  undefined
>;

const getMyCreatedVoteQueryKey = (
  params: GetMyCreatededVoteListServiceProps,
) => [queryKeys.MY_CREATED_VOTE, params];

export default function useGetMyCreatedVoteListService(
  params: GetMyCreatededVoteListServiceProps,
) {
  const { data, fetchNextPage } = useInfiniteQuery(
    getMyCreatedVoteQueryKey(params),
    ({ pageParam }) =>
      getMyCreatedVoteList({ ...params, page: pageParam?.page || 0 }),
    {
      getNextPageParam: ({ last, number }) => {
        if (last) {
          return undefined;
        }
        return {
          page: number + 1,
        };
      },
      keepPreviousData: true,
      staleTime: 0,
    },
  );

  const [subscribe] = useInfiniteScroll(fetchNextPage);

  const myVoteList = data?.pages.flatMap((page) => page.content) ?? [];

  return { myVoteList, subscribe };
}
