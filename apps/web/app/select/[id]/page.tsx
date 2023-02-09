"use client";

import { Button, FloatModalTemplate } from "@chooz/ui";
import { media } from "@chooz/ui/styles/media";
import NumberOfSolver from "components/common/NumberOfSolver";
import TargetMessage from "components/common/TargetMessage";
import AddDetailModal from "components/select/AddDetailModal";
import useFlipAnimation, { Drag } from "components/select/hooks/useFlipAnimation";
import MenuBox from "components/select/MenuBox";
import SelectAB from "components/select/SelectAB";
import VoteToolbar from "components/select/VoteToolbar";
import useOutSideClick from "hooks/useOutsideClick";
import useToggle from "hooks/useToggle";
import Image from "next/image";
import Link from "next/link";
import { AmplifyIcon, HambergerIcon, SaveIcon } from "public/icons";
import { Eximg1, Eximg2, Success } from "public/images";
import React, { useState } from "react";
import useModifyVoteService from "services/useModifyVoteService";
import { useSubmitState } from "store/submitState";
import styled, { css } from "styled-components";

function SelectPage() {
  const { isSubmit, onToggleisSubmit } = useSubmitState();
  const [toggleDetail, onChangeToggleDetail] = useToggle(false);
  const [toggleMenu, onChangeToggleMenu] = useToggle(false);
  const { onChangeVote, onChangeVoteByClick, mutateVote, vote } = useModifyVoteService();
  const { targetEl } = useOutSideClick(toggleMenu, onChangeToggleMenu);
  const { onAniamteFlip, drag } = useFlipAnimation();

  const [select, setSelect] = useState<"A" | "B" | null>(null);
  const onChangeSelect = (select: "A" | "B") => {
    setSelect(select);
  };
  return (
    <>
      <PageWrapper>
        <PageInner className="animate" onWheel={onAniamteFlip} drag={drag}>
          <VoteToolbar
            onChangeToggleDetail={onChangeToggleDetail}
            onChangeToggleMenu={onChangeToggleMenu}
            toggleMenu={toggleMenu}
            targetEl={targetEl}
          />

          <SelectAB
            imageA={Eximg1}
            titleA="아이보리 트위드2"
            imageB={Eximg2}
            titleB="핑크 원피스"
            select={select}
            onChangeSelect={onChangeSelect}
          />
          <AddDescriptionButton>﹢</AddDescriptionButton>
          <DetailButton width="127px" height="48px" variant="primary" borderRadius="100px">
            <Link href="select/1/detail">
              <DetailButtonInner>
                <Image alt="자세히 보기" src={AmplifyIcon} width={40} height={40} /> 자세히 보기
              </DetailButtonInner>
            </Link>
          </DetailButton>
          {/* 자세히 보기 */}
        </PageInner>
        <FirstPageBase className="animate2" drag={drag} />
        <SecondPageBase className="animate3" drag={drag} />
      </PageWrapper>

      {isSubmit && (
        <FloatModalTemplate onToggleModal={onToggleisSubmit}>
          <Image alt="체크" src={Success} width={56} height={56} />
          <GuideText>선택결정이 등록되었어요.</GuideText>
        </FloatModalTemplate>
      )}
      {toggleDetail && (
        <AddDetailModal
          onToggleModal={onChangeToggleDetail}
          mutateVote={mutateVote}
          vote={vote}
          onChangeVote={onChangeVote}
          onChangeVoteByClick={onChangeVoteByClick}
        />
      )}
    </>
  );
}

const PageWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  scrollbar-width: none;
`;

const PageInner = styled.div<{ drag: Drag }>`
  position: relative;
  margin: 0 auto;
  border-radius: 4px;
  height: 525px;
  background-color: ${({ theme }) => theme.palette.background.white};
  max-width: 640px;
  position: relative;
  padding: 30px;
  z-index: 1000;
  ${media.medium} {
    height: 600px;
    padding: 40px;
  }
  ${({ drag }) =>
    drag === "up" &&
    css`
      transition: all 0.5s ease-in-out;
      transform-origin: 50% 0;
      perspective: 600px;
      transform: rotateX(-90deg) scale(0.9, 1.032);
      opacity: 0;
    `}
  ${({ drag }) =>
    drag === "down" &&
    css`
      transition: all 0.5s ease-in-out;
      transform: rotateX(90deg) scale(0.9, 1.032);
      transform-origin: 50% 100%;
      perspective: 600px;
      opacity: 0.5;
    `}
`;

const FirstPageBase = styled.div<{ drag: Drag }>`
  position: absolute;
  background-color: ${({ theme }) => theme.palette.background.white};
  border-radius: 4px;
  width: 90%;
  max-width: 576px;
  height: 550px;
  opacity: 0.6;
  z-index: 500;
  transition: all 0.5s ease-in-out;
  ${media.medium} {
    height: 620px;
  }
  ${({ drag }) =>
    drag === "up" &&
    css`
      perspective: 600px;
      transform-origin: 50% 0;
      transform: scale(1.11, 0.97);
      opacity: 1;
    `}
  ${({ drag }) =>
    drag === "down" &&
    css`
      opacity: 1;
    `}
`;

const SecondPageBase = styled(FirstPageBase)`
  width: 78%;
  max-width: 496px;
  height: 570px;
  opacity: 0.3;
  z-index: 500;
  transition: all 0.5s ease-in-out;
  ${media.medium} {
    height: 640px;
  }
  ${({ drag }) =>
    drag === "up" &&
    css`
      opacity: 0.6;
    `}
  ${({ drag }) =>
    drag === "down" &&
    css`
      opacity: 0.6;
    `}
`;

const AddDescriptionButton = styled.div`
  position: absolute;
  bottom: 30px;
  right: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.palette.ink.dark};
  color: ${({ theme }) => theme.palette.background.white};
  font-size: 45px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  cursor: pointer;
`;

const GuideText = styled.div`
  color: ${({ theme }) => theme.palette.background.white};
  ${({ theme }) => theme.textStyle.Title_Large}
  font-weight: 700;
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

export default SelectPage;
