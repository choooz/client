"use client";

import { useToggle, useOutsideClick } from "@chooz/hooks";
import { Button } from "@chooz/ui";
import { media } from "@chooz/ui/styles/media";
import ModifyVoteModal from "app/select/components/ModifyVoteModal";
import ChipContainer from "app/select/components/ChipContainer";
import Path from "lib/Path";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { AmplifyIcon } from "public/icons";
import React from "react";
import useInfiniteMainListService from "services/useInfiniteMainListService";
import useMutateVotingService from "services/useMutateVotingService";
import styled, { css } from "styled-components";
import SelectAorBContainer from "./select/components/SelectAorBContainer";
import PostCompleteComponent from "./select/components/PostCompleteComponent";
import useFlipAnimation, { Drag } from "./select/hooks/useFlipAnimation";

function SelectPage() {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const [isModifyModal, onToggleModifyModal] = useToggle(false);
  const [isModifyDeleteButtonBox, onToggleModifyDeleteButtonBox] = useToggle(false);
  const { targetEl } = useOutsideClick<HTMLImageElement>(
    isModifyDeleteButtonBox,
    onToggleModifyDeleteButtonBox,
  );
  const { data, isError, isLoading, mainVoteList, nowShowing, onChangeNowShowing } =
    useInfiniteMainListService({ size: 5, sortBy: "ByTime" });
  const { onActFlip, drag, onTouchMoveActFlip } = useFlipAnimation(onChangeNowShowing);
  const { select, onMutateVoting } = useMutateVotingService(mainVoteList[nowShowing]?.voteId);
  const {
    modifiedDate,
    title,
    imageA,
    imageB,
    titleA,
    titleB,
    detail,
    category,
    countVoted,
    writer,
    voteId,
  } = mainVoteList[nowShowing] || {};

  if (isLoading) return <PageInner drag={drag}>로딩중</PageInner>;
  if (isError) return <PageInner drag={drag}>에러</PageInner>;
  if (!data) return <PageInner drag={drag}>데이터 없음</PageInner>;

  return (
    <>
      <PageWrapper>
        <PageInner
          className="animate"
          onWheel={onActFlip}
          onTouchMove={onTouchMoveActFlip}
          drag={drag}
        >
          <ChipContainer
            onToggleModifyModal={onToggleModifyModal}
            onToggleModifyDeleteButtonBox={onToggleModifyDeleteButtonBox}
            isModifyDeleteButtonBox={isModifyDeleteButtonBox}
            targetEl={targetEl}
            title={title}
            date={modifiedDate}
            countVoted={countVoted}
            writer={writer}
            voteId={voteId}
          />
          <SelectAorBContainer
            imageA={imageA || ""}
            titleA={titleA || ""}
            imageB={imageB || ""}
            titleB={titleB || ""}
            select={select.choice}
            onMutateVoting={onMutateVoting}
          />
          <CreateVoteButton>
            <Link href={`${Path.POST_PAGE}`}>﹢</Link>
          </CreateVoteButton>
          <DetailViewButton width="127px" height="48px" variant="primary" borderRadius="100px">
            <Link href={`${Path.VOTE_DETAIL_PAGE}${voteId}`}>
              <DetailButtonInner>
                <Image alt="자세히 보기" src={AmplifyIcon} width={40} height={40} /> 자세히 보기
              </DetailButtonInner>
            </Link>
          </DetailViewButton>
        </PageInner>
        <FirstPageBase className="animate2" drag={drag} />
        <SecondPageBase className="animate3" drag={drag} />
      </PageWrapper>
      {params.get("isSuccess") && <PostCompleteComponent />}
      {isModifyModal && (
        <ModifyVoteModal
          onToggleModal={onToggleModifyModal}
          prevVoteValue={{
            title,
            detail,
            titleA,
            titleB,
            category,
          }}
          voteId={mainVoteList[nowShowing].voteId}
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
  padding: 30px;
  z-index: 1000;
  width: 100%;
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

const CreateVoteButton = styled.div`
  position: absolute;
  bottom: 30px;
  right: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.palette.ink.darker};
  color: ${({ theme }) => theme.palette.background.white};
  font-size: 45px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  cursor: pointer;
`;

const DetailViewButton = styled(Button)`
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
