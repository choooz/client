/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Path from 'lib/Path';
import { getBookMarkCheckAPI, postBookmarkAPI } from 'lib/apis/bookmark';
import { queryKeys } from 'lib/queryKeys';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

type PostBookmarkProps = Exclude<
  Parameters<typeof postBookmarkAPI>[0],
  undefined
>;
const getBookmarkQueryKey = (params: PostBookmarkProps) => [
  queryKeys.BOOKMARK_CHECK,
  params,
];

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

  const router = useRouter();

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
      },
      onError(err, drinkId, context) {
        queryClient.setQueryData(
          getBookmarkQueryKey(voteId),
          context?.previousData,
        );
        if (confirm('로그인이 필요한 서비스입니다.')) {
          router.push(Path.LOGIN_PAGE);
        }
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
