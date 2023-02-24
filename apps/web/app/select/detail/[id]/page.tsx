"use client";

import { useOutsideClick, useToggle } from "@chooz/hooks";
import { media } from "@chooz/ui/styles/media";
import CommentContainer from "components/detail/CommentContainer";
import DetailAB from "components/detail/DetailAB";
import FilterBar from "components/detail/FilterBar";
import VoteAnalyzeBar from "components/detail/VoteAnalyzeBar";
import VoteToolbar from "components/select/VoteToolbar";
import { EmptyAImg, EmptyBImg, Eximg1, Eximg2 } from "public/images";
import React, { useState } from "react";
import useVoteLoadService from "services/useVoteLoadService";
import styled from "styled-components";
import { AorB } from "types/vote";

function DetailPage() {
  const [toggleDetail, onChangeToggleDetail] = useToggle(false);
  const [toggleMenu, onChangeToggleMenu] = useToggle(false);
  const { targetEl } = useOutsideClick<HTMLImageElement>(toggleMenu, onChangeToggleMenu);
  const { data: VoteData, isLoading, isError } = useVoteLoadService(37);

  //데이터
  const [select, setSelect] = useState<AorB | null>(null);

  if (isLoading) return <div>로딩중</div>;
  if (isError) return <div>에러</div>;
  if (!VoteData) return <div>데이터 없음</div>;

  const { title, titleA, titleB, imageA, imageB, description, voteCreatedDate } = VoteData;
  return (
    <PageWrapper>
      <PageInner>
        <VoteToolbar
          onChangeToggleDetail={onChangeToggleDetail}
          onChangeToggleMenu={onChangeToggleMenu}
          toggleMenu={toggleMenu}
          targetEl={targetEl}
          title={title}
          date={voteCreatedDate}
        />
        <DetailAB
          imageA={imageA || EmptyAImg}
          titleA={titleA}
          imageB={imageB || EmptyBImg}
          titleB={titleB}
          select={select}
          setSelect={setSelect}
        />
        <FilterBar />
        <VoteAnalyzeBar A={50} B={50} select={select} />
        <VoteDetail>{description}</VoteDetail>
        <CommentContainer />
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

const VoteDetail = styled.div`
  ${({ theme }) => theme.fontSize.xSmall};
  padding-bottom: 36px;
`;

export default DetailPage;
