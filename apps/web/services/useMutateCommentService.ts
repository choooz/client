import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postComment } from "lib/apis/comments";
import { queryKeys, reactQueryKeys } from "lib/queryKeys";
import { useState } from "react";
import { CommentForm } from "types/comments";

export default function useMutateCommentService(voteId: number) {
  const queryClient = useQueryClient();
  const [commentForm, setCommentForm] = useState<CommentForm>({
    content: "",
    parentId: null,
  });

  const onChangeCommentForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommentForm((prev) => ({
      ...prev,
      content: e.target.value,
    }));
  };

  const { mutate } = useMutation(() => postComment(commentForm, voteId), {
    onSuccess: () => {
      queryClient.invalidateQueries([queryKeys.DETAIL_COMMENT_LIST]);
    },
  });

  return { mutate, onChangeCommentForm, commentForm };
}
