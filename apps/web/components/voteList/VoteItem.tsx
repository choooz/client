"use client";

import { media } from "@chooz/ui/styles/media";
import NumberOfSolver from "components/common/NumberOfSolver";
import TargetMessage from "components/common/TargetMessage";
import { timeDataProcessing } from "lib/utils/timeDataProcessing";
import Image from "next/image";
import { AIcon, BIcon, BookmarkIcon } from "public/icons";
import styled, { css } from "styled-components";
import { Vote } from "types/vote";

interface Props {
  vote: Vote;
}

function VoteItem({ vote }: Props) {
  const { imageA, imageB, titleA, titleB, totalTitle, modifiedDate, countVoted } = vote;

  return (
    <Container>
      <ABImage>
        {imageA ? (
          <Image alt="left image" width={510} height={200} src={imageA} style={LeftImageCss} />
        ) : (
          <AItem>
            <AIcon />
            <ItemTitle>{titleA}</ItemTitle>
          </AItem>
        )}
        {imageB ? (
          <Image alt="right image" width={510} height={200} src={imageB} style={RightImageCss} />
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
        <VoteTitle>{totalTitle}</VoteTitle>
        <VoteModifiedDate>{timeDataProcessing(modifiedDate)}</VoteModifiedDate>
      </TitleContainer>
    </Container>
  );
}

const Container = styled.div`
  margin-top: 20px;
  ${({ theme }) => theme.textStyle.Font_Minimum}
`;

const ABImage = styled.div`
  display: flex;
  max-width: 560px;
  margin: 0 auto;
  /*  @todo 음영효과 추가
  ::after {
    content: "";
    z-index: 99;
    background-image: linear-gradient(to top, rgba(17, 17, 17, 0.6) 50%, rgba(17, 17, 17, 0) 18%);
    width: 100px;
    height: 100px;
  } */
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: column;
  padding: 15% 0;
  flex-grow: 1;
  border-radius: 8px;
  margin-right: 1px;
  aspect-ratio: 1;
`;

const AItem = styled(Item)`
  background-image: linear-gradient(169deg, #9bb7ff -8%, #00dacd 114%);
`;

const BItem = styled(Item)`
  background-image: linear-gradient(to bottom, #ffa4d5 0%, #8054ff 100%);
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

const LeftImageCss = {
  width: "50%",
  height: "100%",
  borderRadius: 8,
  marginRight: 1,
};

const RightImageCss = {
  width: "50%",
  height: "100%",
  borderRadius: 8,
  marginLeft: 1,
};

const VoteContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
  max-width: 560px;
  margin: 8px auto 0;
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
  color: ${({ theme }) => theme.palette.ink.light};
  ${({ theme }) => theme.textStyle.Font_Regular}
  ${media.medium} {
    color: ${({ theme }) => theme.palette.ink.lightest};
  }
`;

export default VoteItem;
