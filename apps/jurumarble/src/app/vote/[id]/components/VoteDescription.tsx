import Image, { StaticImageData } from "next/image";
import React from "react";
import styled, { css } from "styled-components";

type AorB = "A" | "B";
type ActiveType = "active" | "inactive" | null;
type Direction = "left" | "right";

interface Props {
  titleA: string;
  titleB: string;
  imageA: string | StaticImageData;
  imageB: string | StaticImageData;
  select: AorB | null;
  percentageA: number;
  percentageB: number;
  totalCountA: number;
  totalCountB: number;
  onMutateVoting: (select: AorB) => void;
}

function VoteDescription({
  titleA,
  titleB,
  imageA,
  imageB,
  select,
  percentageA,
  percentageB,
  totalCountA,
  totalCountB,
  onMutateVoting,
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
        <SmallTitle>{titleA}</SmallTitle>

        <SmallTitle>{titleB}</SmallTitle>
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
  gap: 9px;
`;

const SmallTitle = styled.div`
  margin-top: 20px;
  padding: 4px;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 8px;
  ${({ theme }) => css`
    border-bottom: 1px solid ${theme.colors.line_01};
    ${theme.typography.body_long03}
  `};
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
  aspect-ratio: 1;
  max-height: 300px;
  .overlay {
    border-radius: 4px;
    position: absolute;
    top: 0;
    left: 0;
    width: 0%;
    visibility: hidden;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 30px;
    color: white;
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
`;

const OverlayPercent = styled.div`
  font-weight: 700;
  font-size: 60px;
  line-height: 40px;
  padding: 24px 0 12px 0;
`;

const OverlayCount = styled.div`
  font-weight: 400;
`;

export default VoteDescription;
