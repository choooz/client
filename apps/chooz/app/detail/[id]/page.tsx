"use client";

import { media } from "@monorepo/ui/styles/media";
import CommentContainer from "components/detail/CommentContainer";
import VoteContainer from "components/detail/VoteContainer";
import React from "react";
import styled from "styled-components";

function DetailPage({
  params,
}: {
  params: {
    id: number;
  };
}) {
  return (
    <PageWrapper>
      <PageInner>
        <VoteContainer postId={params.id} />
        <CommentContainer postId={params.id} />
      </PageInner>
    </PageWrapper>
  );
}

const PageWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  scrollbar-width: none;
`;

const PageInner = styled.div`
  position: relative;
  margin: 0 auto;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.palette.background.white};
  max-width: 640px;
  width: 100%;
  position: relative;
  padding: 30px;
  z-index: 1000;
  height: calc(100vh - 30px - 55px);
  overflow-y: scroll;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
  ${media.medium} {
    padding: 40px;
  }
`;

export default DetailPage;
