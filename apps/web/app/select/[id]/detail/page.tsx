"use client";

import { media } from "@chooz/ui/styles/media";
import Commtent from "components/detail/Commtent";
import DetailAB from "components/detail/DetailAB";
import FilterBar from "components/detail/FilterBar";
import VoteAnalyzeBar from "components/detail/VoteAnalyzeBar";
import VoteToolbar from "components/select/VoteToolbar";
import useOutSideClick from "hooks/useOutsideClick";
import useToggle from "hooks/useToggle";
import { Eximg1, Eximg2 } from "public/images";
import React, { useState } from "react";
import styled from "styled-components";

function DetailPage() {
  const [toggleDetail, onChangeToggleDetail] = useToggle(false);
  const [toggleMenu, onChangeToggleMenu] = useToggle(false);
  const { targetEl } = useOutSideClick<HTMLImageElement>(toggleMenu, onChangeToggleMenu);

  //데이터
  const [select, setSelect] = useState<"A" | "B">("A");
  return (
    <PageWrapper>
      <PageInner>
        <VoteToolbar
          onChangeToggleDetail={onChangeToggleDetail}
          onChangeToggleMenu={onChangeToggleMenu}
          toggleMenu={toggleMenu}
          targetEl={targetEl}
        />
        <DetailAB
          imageA={Eximg1}
          titleA="아이보리 트위드2"
          imageB={Eximg2}
          titleB="핑크 원피스"
          select={select}
        />
        <FilterBar />
        <VoteAnalyzeBar A={50} B={50} select={select} />
        <VoteDetail>
          전남친이 오는 결혼식장에 하객으로 갑니다...
          <br /> 여러분의 혜안이 필요해요
          <br />
          <br />
          <br />
          근데 왼쪽이 5만원 더 비싸긴 합니다...
        </VoteDetail>
        <Commtent />
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
  ${media.medium} {
    padding: 40px;
  }
`;

const VoteDetail = styled.div`
  ${({ theme }) => theme.fontSize.xSmall};
  padding-bottom: 36px;
`;

export default DetailPage;
