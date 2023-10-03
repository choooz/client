import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getCommentById,
  postComment,
  PostCommentRequest,
  postHateComment,
  postLikeComment,
} from "lib/apis/comment";
import { queryKeys, reactQueryKeys } from "lib/queryKeys";
import React from "react";

export default function useCommentServices(
  voteId: number,
  sortBy: "ByTime" | "ByPopularity",
  commentType: "votes" | "drinks",
  paging?: {
    page: number;
    size: number;
  },
) {
  const queryClient = useQueryClient();
  const {
    data: comments,
    isLoading,
    isError,
    fetchNextPage,
  } = useInfiniteQuery(
    reactQueryKeys.detailCommentList(
      voteId,
      commentType,
      paging?.page ?? 0,
      paging?.size ?? 10,
      sortBy,
    ),
    ({ pageParam = 0 }) =>
      getCommentById({
        commentType,
        paging: { page: pageParam, size: 100 },
        sortBy: sortBy,
        typeId: voteId,
      }),
    {
      getNextPageParam: (lastPage, pages) => {
        // @NOTE 백엔드에서 last 작동이 안되어 주석
        if (lastPage.last) return undefined;
        return pages.length + 1;
      },
      keepPreviousData: true,
      cacheTime: 1000 * 60 * 5,
      staleTime: 1000 * 60 * 5,
    },
  );

  const { mutate: mutateLike } = useMutation(
    (commentId: number) => postLikeComment(commentType, voteId, commentId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([queryKeys.DETAIL_COMMENT_LIST]);
      },
    },
  );

  const { mutate: mutateHate } = useMutation(
    (commentId: number) => postHateComment(commentType, voteId, commentId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([queryKeys.DETAIL_COMMENT_LIST]);
      },
    },
  );

  const { mutate: mutateComment } = useMutation((body: PostCommentRequest) =>
    postComment(commentType, voteId, body),
  );

  return { comments, isLoading, isError, fetchNextPage, mutateLike, mutateHate, mutateComment };
}
