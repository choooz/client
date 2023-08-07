import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteComment, hateComment, likeComment } from "lib/apis/comments";
import { queryKeys, reactQueryKeys } from "lib/queryKeys";
import { Comment } from "types/comments";

function useUpdateCommnetService(voteId: number) {
  const queryClient = useQueryClient();

  const { mutate: mutateDeleteComment } = useMutation(
    (commentId: number) => deleteComment(commentId, voteId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([queryKeys.DETAIL_COMMENT_LIST]);
      },
    },
  );

  const { mutate: mutateLike } = useMutation(
    (commentId: number) => likeComment(commentId, voteId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([queryKeys.DETAIL_COMMENT_LIST]);
      },
    },
  );

  const { mutate: mutateHate } = useMutation(
    (commentId: number) => hateComment(commentId, voteId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([queryKeys.DETAIL_COMMENT_LIST]);
      },
    },
  );
  return { mutateDeleteComment, mutateLike, mutateHate };
}
export default useUpdateCommnetService;
