"use client";

import { media } from "@chooz/ui/styles/media";
import { timeDataProcessing } from "lib/utils/timeDataProcessing";
import Image from "next/image";
import { AIcon, BIcon } from "public/icons";
import styled, { css } from "styled-components";
import { MyPageVote } from "types/vote";

interface Props {
  vote: MyPageVote;
}

function VoteItemDesktop({ vote }: Props) {
  const { imageA, imageB, title, modifiedDate, countVoted, countComment } = vote;

  // @Todo Image에 sizes와 priority 추가
  return (
    <Container>
      <ABImage>
        {imageA ? (
          <ImageWrapper>
            <Image
              alt="left image"
              src={imageA}
              fill
              style={{ borderRadius: "8px 0 0 8px", objectFit: "cover" }}
            />
          </ImageWrapper>
        ) : (
          <AItem>
            <AIcon />
          </AItem>
        )}
        {imageB ? (
          <ImageWrapper>
            <Image
              alt="right image"
              src={imageB}
              fill
              style={{ borderRadius: "0 8px 8px 0", objectFit: "cover" }}
            />
          </ImageWrapper>
        ) : (
          <BItem>
            <BIcon />
          </BItem>
        )}
      </ABImage>
      <VoteInfo>
        <MessageContainer>
          <Message>A vs B</Message>
          <NumberOfSolver>🔥{countVoted}명 해결중!</NumberOfSolver>
        </MessageContainer>
        <VoteTitle>{title}</VoteTitle>
        <CommentAndDateContainer>
          💬 {countVoted}
          <DividingPoint>•</DividingPoint>
          {timeDataProcessing(modifiedDate)}
        </CommentAndDateContainer>
      </VoteInfo>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  height: 84px;
  margin-top: 20px;
  ${({ theme }) => theme.textStyle.Font_Minimum}
`;

const ABImage = styled.div`
  position: relative;
  display: flex;
  max-width: 168px;
  /*  @todo 음영효과 추가
  ::after {
    content: "";
    z-index: 99;
    background-image: linear-gradient(to top, rgba(17, 17, 17, 0.6) 50%, rgba(17, 17, 17, 0) 18%);
    width: 100px;
    height: 100px;
  } */
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 50%;
  aspect-ratio: 1;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 15% 0;
  flex-grow: 1;
  aspect-ratio: 1;
`;

const AItem = styled(Item)`
  background-image: linear-gradient(169deg, #9bb7ff -8%, #00dacd 114%);
  border-radius: 8px 0 0 8px;
`;

const BItem = styled(Item)`
  background-image: linear-gradient(to bottom, #ffa4d5 0%, #8054ff 100%);
  border-radius: 0 8px 8px 0;
`;

const VoteInfo = styled.div`
  margin-left: 28px;
`;

const MessageContainer = styled.div`
  display: flex;
`;

// @Todo 공통 컴포넌트로 묶기
const Message = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 46px;
  padding: 4px 6px;
  border-radius: 4px;
  ${({ theme }) => css`
    background-color: ${theme.palette.main.point};
    color: ${theme.palette.ink.lightest};
  `};
`;

const NumberOfSolver = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px 6px;
  border-radius: 4px;
  margin-left: 4px;
  ${({ theme }) => css`
    background-color: ${theme.palette.background.black};
    color: ${theme.palette.ink.lightest};
  `};
`;

const VoteTitle = styled.h3`
  font-weight: 700;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  margin-top: 8px;
  ${({ theme }) => theme.textStyle.Font_Regular}
  ${media.medium} {
    color: ${({ theme }) => theme.palette.ink.lightest};
    ${({ theme }) => theme.textStyle.Title_Small}
  }
`;

const CommentAndDateContainer = styled.div`
  margin-top: 16px;
  font-weight: 700;
  color: ${({ theme }) => theme.palette.ink.base};
`;

const DividingPoint = styled.span`
  margin: 0 4px;
  color: ${({ theme }) => theme.palette.ink.lighter};
`;

export default VoteItemDesktop;
