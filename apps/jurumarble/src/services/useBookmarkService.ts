/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getBookMarkCheckAPI, postBookmarkAPI } from 'lib/apis/bookmark';
import { queryKeys } from 'lib/queryKeys';
import { toast } from 'react-toastify';

type PostBookmarkProps = Exclude<
  Parameters<typeof postBookmarkAPI>[0],
  undefined
>;
const getBookmarkQueryKey = (params: PostBookmarkProps) => [
  queryKeys.BOOKMARK_CHECK,
  params,
];

const getTheNumberOfMyVoteQueryKey = [queryKeys.THE_NUMBER_OF_MY_VOTE];
const getMyCreatedVoteQueryKey = [queryKeys.MY_CREATED_VOTE];
const getMyBookmarkedVoteQueryKey = [queryKeys.MY_BOOKMARKED_VOTE];
const getMyParticipateVotedQueryKey = [queryKeys.MY_PARTICIPATED_VOTE];

export default function useBookmarkService(voteId: PostBookmarkProps) {
  const queryClient = useQueryClient();

  const { data: bookmarkCheck } = useQuery(
    getBookmarkQueryKey(voteId),
    () => getBookMarkCheckAPI(voteId),
    {
      enabled: !!voteId,
    },
  );

  const isBookmark = bookmarkCheck?.bookmarked || false;

  const { mutate: mutateBookMark } = useMutation(
    () => postBookmarkAPI(voteId),
    {
      async onMutate() {
        await queryClient.cancelQueries(getBookmarkQueryKey(voteId));
        const previousData = queryClient.getQueryData(
          getBookmarkQueryKey(voteId),
        );
        queryClient.setQueryData(getBookmarkQueryKey(voteId), (old: any) => [
          old,
          voteId,
        ]);
        return { previousData };
      },
      onSuccess: () => {
        const previousData = queryClient.getQueryData(
          getBookmarkQueryKey(voteId),
        ) as any;
        toast(
          previousData[0].bookmarked
            ? '북마크에서 삭제되었어요'
            : '북마크에 추가되었어요',
          {
            toastId: 'bookmark',
          },
        );
        queryClient.invalidateQueries(getTheNumberOfMyVoteQueryKey);
        queryClient.invalidateQueries(getMyCreatedVoteQueryKey);
        queryClient.invalidateQueries(getMyBookmarkedVoteQueryKey);
        queryClient.invalidateQueries(getMyParticipateVotedQueryKey);
      },
      onError(err, drinkId, context) {
        queryClient.setQueryData(
          getBookmarkQueryKey(voteId),
          context?.previousData,
        );
      },

      onSettled(_, __) {
        queryClient.invalidateQueries({
          queryKey: getBookmarkQueryKey(voteId),
        });
      },
    },
  );

  return { isBookmark, mutateBookMark };
}
