import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteComment, putComment } from "lib/apis/comment";
import { queryKeys, reactQueryKeys } from "lib/queryKeys";

export default function useCommentDeleteService(
  commentType: "votes" | "drinks",
  typeId: number,
  commentId: number,
) {
  const queryClient = useQueryClient();
  const { mutate } = useMutation(() => deleteComment(commentType, typeId, commentId), {
    onSuccess: () => {
      alert("댓글이 삭제되었습니다.");
      queryClient.invalidateQueries([queryKeys.DETAIL_COMMENT_LIST]);
    },
  });

  const { mutate: onPutComment } = useMutation(
    (comment: string) => putComment(commentType, typeId, commentId, comment),
    {
      onSuccess: () => {
        alert("댓글이 수정되었습니다.");
        queryClient.invalidateQueries([queryKeys.DETAIL_COMMENT_LIST]);
      },
    },
  );

  return {
    onDelete: mutate,
    onPutComment,
  };
}
