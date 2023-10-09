import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteComment } from "lib/apis/comment";
import { reactQueryKeys } from "lib/queryKeys";

export default function useCommentDeleteService(
  commentType: "votes" | "drinks",
  typeId: number,
  commentId: number,
) {
  const queryClient = useQueryClient();
  const { mutate } = useMutation(() => deleteComment(commentType, typeId, commentId), {
    onSuccess: () => {
      alert("댓글이 삭제되었습니다.");
      queryClient.invalidateQueries([reactQueryKeys.detailCommentList]);
    },
  });
  return {
    onDelete: mutate,
  };
}
