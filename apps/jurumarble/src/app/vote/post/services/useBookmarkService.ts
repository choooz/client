import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookMarkCheckAPI, postBookmarkAPI } from "lib/apis/bookmark";
import Path from "lib/Path";
import { queryKeys, reactQueryKeys } from "lib/queryKeys";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function usePostBookmarkService(voteId: number) {
  const queryClient = useQueryClient();

  const bookMarkCheckQuery = useQuery(
    reactQueryKeys.bookmarkCheck(),
    () => getBookMarkCheckAPI(voteId),
    {
      enabled: !!voteId,
    },
  );

  const router = useRouter();
  const { mutate: mutateBookMark } = useMutation(() => postBookmarkAPI(voteId), {
    onSuccess: () => {
      queryClient.invalidateQueries([queryKeys.BOOKMARK_CHECK]);
      toast("북마크에서 해제되었어요");
    },
    onError: () => {
      if (confirm("로그인이 필요한 서비스입니다.")) {
        router.push(Path.VOTE_HOME);
      }
    },
  });

  return { mutateBookMark, bookMarkCheckQuery };
}
