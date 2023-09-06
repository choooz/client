"use client";

import BottomBar from "components/BottomBar";
import { Button } from "components/button";
import Header from "components/Header";
import { media } from "lib/styles";
import { ExImg1 } from "public/images";
import React, { useState } from "react";
import SvgIcDetail from "src/assets/icons/components/IcDetail";
import styled, { css } from "styled-components";
import useFlipAnimation from "./hooks/useFlipAnimation";
import ChipContainer from "./[id]/components/ChipContainer";
import VoteDescription from "./[id]/components/VoteDescription";

export type Drag = "up" | "down" | null;

function VoteHomePage() {
  //   const { data, isError, isLoading, mainVoteList, nowShowing, onChangeNowShowing } =
  //     useInfiniteMainListService({ size: 5, sortBy: "ByTime" });
  const [selected, setSelected] = useState<"A" | "B" | null>(null);
  const onMutateVoting = (select: "A" | "B") => {
    setSelected(select);
  };

  const onChangeNowShowing = () => {
    console.log("z");
  };

  const { onActFlip, drag, onTouchStartPosition, onTouchMoveActFlip } =
    useFlipAnimation(onChangeNowShowing);
  return (
    <>
      <Background>
        <Header />
        <AskVoteBox>
          <AskVoteText>
            당신의 투표를
            <br /> 기다리고 있어요
          </AskVoteText>
          <div>
            <Button variant="primary" width="104px" height="40px">
              작성하기 <BigFont>﹢</BigFont>
            </Button>
          </div>
        </AskVoteBox>
        <Container>
          <PageInner
            className="animate"
            onWheel={onActFlip}
            onTouchStart={onTouchStartPosition}
            onTouchEnd={onTouchMoveActFlip}
            drag={drag}
          >
            <ChipContainer />
            <VoteDescription
              imageA={ExImg1}
              imageB={ExImg1}
              percentageA={50}
              percentageB={50}
              titleA={"A가 더 좋아요"}
              titleB={"B가 더 좋아요"}
              totalCountA={100}
              totalCountB={100}
              select={selected}
              onMutateVoting={onMutateVoting}
            />
            <MoreButton>
              더보기 <SvgIcDetail width={16} height={16} />
            </MoreButton>
          </PageInner>
          <FirstPageBase className="animate2" drag={drag} />
          <SecondPageBase className="animate3" drag={drag} />
        </Container>
      </Background>
      <BottomBar />
    </>
  );
}

const Background = styled.div`
  background-color: ${({ theme }) => theme.colors.bg_01};
  height: calc(100svh - 100px);
`;

const Container = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  scrollbar-width: none;
`;

const PageInner = styled.div<{ drag: Drag }>`
  position: relative;
  margin: 0 auto;
  border-radius: 10px;
  min-height: 453px;
  background-color: ${({ theme }) => theme.colors.white};
  max-width: 640px;
  padding: 30px;
  z-index: 1000;
  width: 100%;
  ${media.small} {
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

const AskVoteBox = styled.div`
  width: 100%;
  display: flex;
  margin: 0 auto;
  justify-content: space-between;
  padding: 24px 20px;
  max-width: 640px;
  background-color: ${({ theme }) => theme.colors.bg_01};
`;

const FirstPageBase = styled.div<{ drag: Drag }>`
  position: absolute;
  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 4px;
  width: 90%;
  max-width: 576px;
  min-height: 473px;
  opacity: 0.6;
  z-index: 500;
  transition: all 0.5s ease-in-out;
  ${media.small} {
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
      transform: scale(1.11, 0.97);
    `}
`;

const SecondPageBase = styled(FirstPageBase)`
  width: 78%;
  max-width: 496px;
  min-height: 493px;
  opacity: 0;
  z-index: 500;
  transition: all 0.5s ease-in-out;
  ${media.small} {
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

const BigFont = styled.span`
  font-size: 17px;
`;

const AskVoteText = styled.div`
  ${({ theme }) => theme.typography.headline02}
`;

const MoreButton = styled.button`
  position: absolute;
  left: 50%;
  right: 50%;
  transform: translate(-50%, -50%);
  bottom: -40px;
  height: 40px;
  width: 94px;
  border-radius: 8px;
  ${({ theme }) => css`
    color: ${theme.colors.white};
    background-color: ${theme.colors.black_02};
    ${theme.typography.button01}
  `};
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
`;
export default VoteHomePage;
