import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "lib/queryKeys";
import Link from "next/link";
import { useState } from "react";
import styled from "styled-components";

// import useCommentFilter from "../hooks/useCommentFilter";
import useCommentServices from "../services/useCommentServices";

import Comment from "./Comment";
import CommentForm from "./CommentForm";
import CommentToolBar from "./CommentToolbar";

interface Props {
  postId: number;
}

function CommentContainer({ postId }: Props) {
  const queryClient = useQueryClient();
  const [sortBy, setSortBy] = useState<"ByTime" | "ByPopularity">("ByTime");
  const onChangeFilter = (sort: "ByTime" | "ByPopularity") => {
    setSortBy(sort);
  };

  // const { commentFilter, onChangeCommentFilter } = useCommentFilter();
  const { comments, isError, isLoading, mutateHate, mutateLike, mutateComment } =
    useCommentServices(postId, sortBy, "votes");

  const [commentForm, setCommentForm] = useState("");
  const onChangeCommentForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommentForm(e.target.value);
  };
  const onSubmitComment = () => {
    mutateComment(
      {
        content: commentForm,
        parentId: null,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries([queryKeys.DETAIL_COMMENT_LIST]);
          setCommentForm("");
        },
      },
    );
  };

  if (isError) return <div>에러</div>;
  if (!comments) return <div>데이터 없음</div>;

  const commentList = comments.pages.flatMap((page) => page.content);

  return (
    <>
      <Container>
        <CommentToolBar
          commentCount={comments.pages[0].numberOfElements}
          onChangeFilter={onChangeFilter}
          sortBy={sortBy}
        />
        <CommentForm
          commentForm={commentForm}
          onChangeCommentForm={onChangeCommentForm}
          onSubmitComment={onSubmitComment}
        />

        {!isLoading &&
          commentList.map(
            (
              {
                id,
                age,
                content,
                createdDate,
                gender,
                hateCount,
                likeCount,
                mbti,
                nickName,
                userId,
                restaurant,
              },
              index,
            ) => (
              <Comment
                postId={Number(postId)}
                voteType="votes"
                comment={{
                  id,
                  content,
                  age,
                  createdDate,
                  gender,
                  hateCount,
                  likeCount,
                  mbti,
                  nickName,
                  userId: userId,
                  restaurant,
                }}
                mutateLike={() => mutateLike(id)}
                mutateHate={() => mutateHate(id)}
                key={`comment_id_${index}`}
                postId={postId}
              />
            ),
          )}
        <br />
      </Container>
    </>
  );
}

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export default CommentContainer;
