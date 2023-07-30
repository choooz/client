import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookMarkCheckAPI, postBookmarkAPI } from "lib/apis/vote";
import { queryKeys, reactQueryKeys } from "lib/queryKeys";

export default function useBookMarkService(voteId: number) {
  const queryClient = useQueryClient();

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
  });

  return {
    bookMarkCheckQuery,
    mutateBookMark,
  };
}
