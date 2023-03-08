import { Button } from "@chooz/ui";
import React from "react";
import styled from "styled-components";
import CommentForm from "./CommentForm";
import CommentToolBar from "./CommentToolBar";
import Comment from "./Comment";
import Image from "next/image";
import Link from "next/link";
import { AmplifyIcon } from "public/icons";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getCommentById } from "lib/apis/comments";
import { reactQueryKeys } from "lib/queryKeys";
import useMutateCommentService from "services/useMutateCommentService";
import useUpdateCommnetService from "services/useUpdateCommnetService";
import useCommentFilter from "./hooks/useCommentFilter";

interface Props {
  postId: number;
}

function CommentContainer({ postId }: Props) {
  const { commentFilter, onChangeCommentFilter } = useCommentFilter();
  const { age, gender, mbti, sortBy } = commentFilter;
  const {
    data: comments,
    isLoading,
    isError,
    fetchNextPage,
  } = useInfiniteQuery(
    reactQueryKeys.detailCommentList(postId, age, mbti, gender, sortBy),
    ({ pageParam = 0 }) => getCommentById(postId, commentFilter, pageParam),
    {
      getNextPageParam: (lastPage, pages) => {
        // if (lastPage.last) return undefined;
        return pages.length + 1;
      },
      keepPreviousData: true,
      cacheTime: 1000 * 60 * 5,
      staleTime: 1000 * 60 * 5,
    },
  );
  const {
    mutate: onSubmitComment,
    commentForm,
    onChangeCommentForm,
  } = useMutateCommentService(postId);
  const { mutateDeleteComment, mutateLike, mutateHate } = useUpdateCommnetService(postId);

  if (isLoading) return <div>로딩중</div>;
  if (isError) return <div>에러</div>;
  if (!comments) return <div>데이터 없음</div>;

  const commentDatas = comments.pages.flatMap((page) => page.content);

  return (
    <Container>
      <CommentToolBar
        commentCount={commentDatas.length}
        onChangeFilter={onChangeCommentFilter}
        sortBy={sortBy}
      />
      <CommentForm
        commentForm={commentForm}
        onChangeCommentForm={onChangeCommentForm}
        onSubmitComment={onSubmitComment}
      />
      {commentDatas.map((commentData) => (
        <Comment
          comment={commentData}
          mutateDeleteComment={() => mutateDeleteComment(commentData.id)}
          mutateLike={() => mutateLike(commentData.id)}
          mutateHate={() => mutateHate(commentData.id)}
          key={`comment_${commentData.id}`}
        />
      ))}
      <Button width="100%" height="48px" variant="outline" onClick={() => fetchNextPage()}>
        댓글 더보기
      </Button>

      <DetailButton width="127px" height="48px" variant="primary" borderRadius="100px">
        <Link href="select">
          <DetailButtonInner>
            <Image alt="자세히 보기" src={AmplifyIcon} width={40} height={40} /> 간단히 보기
          </DetailButtonInner>
        </Link>
      </DetailButton>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const DetailButton = styled(Button)`
  position: absolute;
  bottom: -24px;
  right: 50%;
  transform: translateX(50%);
`;

const DetailButtonInner = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  padding-right: 4px;
  font-size: 14px;
`;

export default CommentContainer;
