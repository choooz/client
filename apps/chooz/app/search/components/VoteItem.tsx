"use client";

import { media } from "@monorepo/ui/styles/media";
import { timeDataProcessing } from "lib/utils/timeDataProcessing";
import Image from "next/image";
import Link from "next/link";
import { AIcon, BIcon, BookmarkIcon } from "public/icons";
import styled, { css } from "styled-components";
import { Vote } from "types/vote";
import Path from "lib/Path";
import { NumberOfSolver, TargetMessage } from "components";

interface Props {
  vote: Vote;
}

function VoteItem({ vote }: Props) {
  const { voteId, imageA, imageB, titleA, titleB, title, modifiedDate, countVoted } = vote;

  // @Todo Image에 sizes와 priority 추가
  return (
    <Link href={`${Path.VOTE_DETAIL_PAGE}${voteId}`}>
      <Container>
        <ABImage>
          <GradientBox />
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
              <ItemTitle>{titleA}</ItemTitle>
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
              <ItemTitle>{titleB}</ItemTitle>
            </BItem>
          )}
        </ABImage>
        <VoteContainer>
          <MessageBox>
            <TargetMessage>이 고민을 찾고있는 분이에요!</TargetMessage>
            <NumberOfSolver>🔥{countVoted}명 해결중!</NumberOfSolver>
          </MessageBox>
          <BookmarkIconStyled />
        </VoteContainer>
        <TitleContainer>
          <VoteTitle>{title}</VoteTitle>
          <VoteModifiedDate>{timeDataProcessing(modifiedDate)}</VoteModifiedDate>
        </TitleContainer>
      </Container>
    </Link>
  );
}

const Container = styled.div`
  margin-top: 20px;
  ${({ theme }) => theme.textStyle.Font_Minimum}
`;

const GradientBox = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100%;
  border-radius: 0 0 8px 8px;
  z-index: 1;
  background: linear-gradient(to top, rgba(17, 17, 17, 0.6) 0%, rgba(17, 17, 17, 0) 50%);
`;

const ABImage = styled.div`
  position: relative;
  display: flex;
  max-width: 560px;
  margin: 0 auto;
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 50%;
  aspect-ratio: 1;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
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

const ItemTitle = styled.span`
  opacity: 0.8;
  font-weight: 700;
  ${({ theme }) =>
    css`
      color: ${theme.palette.ink.lightest};
      ${theme.textStyle.Font_Regular}
      ${media.medium} {
        ${theme.textStyle.Title_Large}
      }
    `};
`;

const VoteContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
  max-width: 560px;
  margin: 8px auto 0;
  z-index: 2;
  ${media.medium} {
    width: 521px;
    margin: 0 auto;
    position: relative;
    bottom: 72px;
  }
`;

const MessageBox = styled.div`
  display: flex;
`;

const BookmarkIconStyled = styled(BookmarkIcon)`
  margin-left: 14px;
  path {
    fill: ${({ theme }) => theme.palette.main.point};
  }
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 560px;
  margin: 0 auto;
  z-index: 2;
  ${media.medium} {
    width: 528px;
    margin: 0 auto;
    position: relative;
    bottom: 66px;
  }
`;

const VoteTitle = styled.h3`
  font-weight: 700;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  ${({ theme }) => theme.textStyle.Font_Regular}
  ${media.medium} {
    color: ${({ theme }) => theme.palette.ink.lightest};
    ${({ theme }) => theme.textStyle.Title_Small}
  }
`;

const VoteModifiedDate = styled.span`
  color: ${({ theme }) => theme.palette.ink.base};
  ${({ theme }) => theme.textStyle.Font_Regular}
  ${media.medium} {
    color: ${({ theme }) => theme.palette.ink.lightest};
  }
`;

export default VoteItem;
