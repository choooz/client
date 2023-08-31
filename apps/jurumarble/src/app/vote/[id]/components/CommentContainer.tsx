import Link from "next/link";
import styled from "styled-components";

import useCommentFilter from "../hooks/useCommentFilter";

import Comment from "./Comment";
import CommentForm from "./CommentForm";
import CommentToolBar from "./CommentToolbar";

interface Props {
  postId: number;
}

function CommentContainer({ postId }: Props) {
  const { commentFilter, onChangeCommentFilter } = useCommentFilter();
  return (
    <Container>
      <CommentToolBar commentCount={65} onChangeFilter={onChangeCommentFilter} />
      {/* <CommentForm
        commentForm={commentForm}
        onChangeCommentForm={onChangeCommentForm}
        onSubmitComment={onSubmitComment}
        profileImage={userInfo?.imageUrl}
      /> */}
      <CommentForm />
      <Comment
        comment={{
          id: 1,
          content: "댓글 내용",
          age: 1,
          createdDate: "21.07.07",
          gender: "댓글 내용",
          hateCount: 1,
          imageUrl: "댓글 내용",
          likeCount: 1,
          mbti: "댓글 내용",
          nickName: "댓글 내용",
          parentId: 1,
          userId: 1,
        }}
        mutateDeleteComment={() => void 0}
        mutateLike={() => void 0}
        mutateHate={() => void 0}
        key={`comment_id`}
      />
      <hr />
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const DetailButton = styled.button`
  position: absolute;
  bottom: -50px;
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
