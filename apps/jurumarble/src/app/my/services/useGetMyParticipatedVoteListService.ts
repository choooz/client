import { useInfiniteScroll } from '@monorepo/hooks';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getMyParticipatedVoteList } from 'lib/apis/my';
import { queryKeys } from 'lib/queryKeys';

type GetMyParticipatedVoteListServiceProps = Exclude<
  Parameters<typeof getMyParticipatedVoteList>[0],
  undefined
>;

const getMyParticipateVotedQueryKey = (
  params: GetMyParticipatedVoteListServiceProps,
) => [queryKeys.MY_PARTICIPATED_VOTE, params];

export default function useGetMyParticipatedVoteListService(
  params: GetMyParticipatedVoteListServiceProps,
) {
  const { data, fetchNextPage } = useInfiniteQuery(
    getMyParticipateVotedQueryKey(params),
    ({ pageParam }) =>
      getMyParticipatedVoteList({ ...params, page: pageParam?.page || 0 }),
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
