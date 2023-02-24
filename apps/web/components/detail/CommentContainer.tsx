import { Button } from "@chooz/ui";
import React from "react";
import styled from "styled-components";
import CommentForm from "./CommentForm";
import CommentToolBar from "./CommentToolBar";
import Comment from "./Comment";
import Image from "next/image";
import Link from "next/link";
import { AmplifyIcon } from "public/icons";

function CommentContainer() {
  return (
    <Container>
      <CommentToolBar />
      <CommentForm />
      <Comment />
      <Comment /> <Comment />
      <Comment /> <Comment />
      <Comment />
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
