import Image, { StaticImageData } from "next/image";
import { CheckRound, EmptyAImg, EmptyBImg } from "public/images";
import React from "react";
import styled, { css } from "styled-components";
import { media } from "styles/media";
import { ActiveType, AorB, Direction } from "types/vote";

interface Props {
  titleA: string;
  titleB: string;
  imageA: string | StaticImageData;
  imageB: string | StaticImageData;
  select: AorB | null;
  onMutateVoting: (select: AorB) => void;
}

function SelectAB({ titleA, titleB, imageA, imageB, select, onMutateVoting }: Props) {
  const getAB = (direction: Direction) => {
    return direction === "left" ? "A" : "B";
  };

  const activeValue = (direction: Direction): ActiveType => {
    if (!select) return null;
    return `${select === getAB(direction) ? "" : "in"}active`;
  };

  return (
    <Container>
      <ImageWrapper>
        <LeftVote selected={activeValue("left")} onClick={() => onMutateVoting("A")}>
          <VoteImageWrapper>
            <Image
              src={imageA || EmptyAImg}
              width={272}
              height={340}
              alt="A 이미지"
              style={{
                objectFit: "cover",
                width: "auto",
                height: "100%",
              }}
            />
          </VoteImageWrapper>
          <SmallTitle>
            {select === "A" && (
              <CheckImage>
                <Image alt="선택된 선택지" src={CheckRound} width={16} height={16} />
              </CheckImage>
            )}
            {titleA}
            {select === "A" && <div>으로 Chooz!</div>}
          </SmallTitle>
        </LeftVote>

        <RightVote selected={activeValue("right")} onClick={() => onMutateVoting("B")}>
          <VoteImageWrapper>
            <Image
              src={imageB || EmptyBImg}
              alt="B 이미지"
              width={272}
              height={340}
              style={{
                objectFit: "cover",
                width: "auto",
                height: "100%",
              }}
            />
          </VoteImageWrapper>
          <SmallTitle>
            {select === "B" && (
              <CheckImage>
                <Image alt="선택된 선택지" src={CheckRound} width={16} height={16} />
              </CheckImage>
            )}
            {titleB}
            {select === "B" && <div>으로 Chooz!</div>}
          </SmallTitle>
        </RightVote>
      </ImageWrapper>
    </Container>
  );
}

const Container = styled.div``;

const ImageWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  gap: 16px;
  height: 184px;
  ${media.medium} {
    height: 340px;
  }
`;

const CheckImage = styled.div`
  padding: 0 8px;
`;

const SmallTitle = styled.div`
  margin-top: 20px;
  border-bottom: 1px solid ${({ theme }) => theme.palette.border.base};
  padding: 4px;
  width: 100%;
  display: flex;
`;

const variantStyles = {
  active: css`
    transition: all 0.3s ease-in-out;
    width: 90%;
    font-size: 16px;
    font-weight: 700;
    padding: 0 1px;
    color: ${({ theme }) => theme.palette.main.sub};
    pointer-events: none;
    border: 1px solid ${({ theme }) => theme.palette.main.point};
    border-radius: 8px;
    background-color: ${({ theme }) => theme.palette.background.selected};
  `,
  inactive: css`
    width: 10%;
    pointer-events: none;
  `,
};

const typeGuardVariantStyle = (selected: ActiveType) => {
  if (!selected) return null;
  return variantStyles[selected];
};

const LeftVote = styled.div<{ selected: ActiveType }>`
  position: relative;
  width: 50%;
  transition: all 0.3s ease-in-out;
  &:hover {
    width: 90%;
  }
  ${({ selected }) => typeGuardVariantStyle(selected)}
`;

const RightVote = styled(LeftVote)``;

const VoteImageWrapper = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 184px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  ${media.medium} {
    height: 340px;
  }
`;
export default SelectAB;
