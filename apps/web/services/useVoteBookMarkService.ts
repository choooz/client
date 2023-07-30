import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookMarkCheckAPI, postBookmarkAPI } from "lib/apis/vote";
import Path from "lib/Path";
import { queryKeys, reactQueryKeys } from "lib/queryKeys";
import { useRouter } from "next/navigation";

export default function useBookMarkService(voteId: number) {
  const queryClient = useQueryClient();
  const router = useRouter();

  const bookMarkCheckQuery = useQuery(
    reactQueryKeys.bookmarkCheck(voteId),
    () => getBookMarkCheckAPI(voteId),
    {
      enabled: !!voteId,
    },
  );

  const { mutate: mutateBookMark } = useMutation(() => postBookmarkAPI(voteId), {
    onSuccess: () => {
      queryClient.invalidateQueries([queryKeys.BOOKMARK_CHECK]);
    },
    onError: () => {
      if (confirm("로그인이 필요한 서비스입니다.")) {
        router.push(Path.LOGIN_PAGE);
      }
    },
  });

  return {
    bookMarkCheckQuery,
    mutateBookMark,
  };
}
