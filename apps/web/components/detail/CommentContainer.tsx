import { Button } from "@chooz/ui";
import React from "react";
import styled from "styled-components";
import CommentForm from "./CommentForm";
import CommentToolBar from "./CommentToolBar";
import Comment from "./Comment";
import Image from "next/image";
import Link from "next/link";
import { AmplifyIcon } from "public/icons";
import { useQuery } from "@tanstack/react-query";
import { getCommentById } from "lib/apis/comments";

interface Props {
  postId: number;
}

function CommentContainer({ postId }: Props) {
  const {
    data: commentDatas,
    isLoading,
    isError,
  } = useQuery(["comments"], () => getCommentById(postId));

  if (isLoading) return <div>로딩중</div>;
  if (isError) return <div>에러</div>;
  if (!commentDatas) return <div>데이터 없음</div>;

  return (
    <Container>
      <CommentToolBar />
      <CommentForm />
      {commentDatas.map((commentData) => (
        <Comment comment={commentData} />
      ))}

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
