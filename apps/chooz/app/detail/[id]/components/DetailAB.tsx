import { media } from "@monorepo/ui/styles/media";
import Image, { StaticImageData } from "next/image";
import { CheckRound } from "public/images";
import React from "react";
import styled, { css } from "styled-components";
import { ActiveType, AorB, Direction } from "types/vote";

interface Props {
  titleA: string;
  titleB: string;
  imageA: string | StaticImageData;
  imageB: string | StaticImageData;
  select: AorB | null;
  onMutateVoting: (select: AorB) => void;
  percentageA: number;
  percentageB: number;
  totalCountA: number;
  totalCountB: number;
}

function DetailAB({
  titleA,
  titleB,
  imageA,
  imageB,
  select,
  onMutateVoting,
  percentageA,
  percentageB,
  totalCountA,
  totalCountB,
}: Props) {
  const getAB = (direction: Direction) => {
    return direction === "left" ? "A" : "B";
  };

  const activeValue = (direction: Direction): ActiveType => {
    if (!select) return null;
    return `${select === getAB(direction) ? "" : "in"}active`;
  };

  const onClickVote = (chooz: AorB) => {
    if (!!select) return;
    onMutateVoting(chooz);
  };
  return (
    <Container>
      <ImageWrapper>
        <LeftVote
          selected={activeValue("left")}
          onClick={() => onClickVote("A")}
          percent={percentageA > 0 ? percentageA : 0}
        >
          <Image src={imageA} alt="A 이미지" fill />
          <div className="overlay">
            <OverLayTitle>{titleA}</OverLayTitle>
            <OverlayPercent>{percentageA}%</OverlayPercent>
            <OverlayCount> {totalCountA}명</OverlayCount>
          </div>
        </LeftVote>

        <RightVote
          selected={activeValue("right")}
          onClick={() => onClickVote("B")}
          percent={percentageB > 0 ? percentageB : 0}
        >
          <Image src={imageB} fill alt="B 이미지" />
          <div className="overlay">
            <OverLayTitle>{titleB}</OverLayTitle>
            <OverlayPercent>{percentageB}%</OverlayPercent>
            <OverlayCount> {totalCountB}명</OverlayCount>
          </div>
        </RightVote>
      </ImageWrapper>
      <FlexRow>
        <SmallTitle>
          {select === "A" && <Image alt="선택" src={CheckRound} width={16} />}
          {titleA}
        </SmallTitle>

        <SmallTitle>
          {select === "B" && <Image alt="선택" src={CheckRound} width={16} />}
          {titleB}
        </SmallTitle>
      </FlexRow>
    </Container>
  );
}

const Container = styled.div``;

const ImageWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  width: 100%;
  gap: 16px;
  height: 184px;
  ${media.medium} {
    height: 340px;
  }
`;

const SmallTitle = styled.div`
  margin-top: 20px;
  border-bottom: 1px solid ${({ theme }) => theme.palette.border.base};
  padding: 4px;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const FlexRow = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const variantStyles = {
  active: css`
    transition: all 0.3s ease-in-out;
    width: 100%;
    font-size: 16px;
    font-weight: 700;
    padding: 0 1px;
    color: ${({ theme }) => theme.palette.main.sub};
  `,
  inactive: css`
    width: 0%;
  `,
};

const typeGuardVariantStyle = (selected: ActiveType) => {
  if (!selected) return null;
  return variantStyles[selected];
};

const LeftVote = styled.div<{ selected: ActiveType; percent: number }>`
  position: relative;
  width: 50%;
  .overlay {
    border-radius: 4px;
    position: absolute;
    top: 0;
    left: 0;
    width: 0%;
    visibility: hidden;
    height: 100%;
    background-color: ${({ theme }) => theme.palette.main.opacitySub};
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 30px;
    color: white;
    border: 2px solid ${({ theme }) => theme.palette.main.sub};
    ${({ selected, percent }) =>
      selected === "active" &&
      css`
        width: ${percent}%;
        visibility: visible;
      `};
  }
  ${({ selected }) => typeGuardVariantStyle(selected)}
`;

const RightVote = styled(LeftVote)`
  .overlay {
    align-items: flex-end;
    left: unset;
    right: 0;
  }
`;

const OverLayTitle = styled.div`
  font-weight: 700;
  ${({ theme }) => theme.textStyle.Title_Small}
`;

const OverlayPercent = styled.div`
  font-weight: 700;
  font-size: 60px;
  line-height: 40px;
  padding: 24px 0 12px 0;
`;

const OverlayCount = styled.div`
  font-weight: 400;
  ${({ theme }) => theme.textStyle.Title_2}
`;

export default DetailAB;
