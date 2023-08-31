import Image, { StaticImageData } from "next/image";
import React from "react";
import SvgIcPrev from "src/assets/icons/components/IcPrev";
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
          <Image
            src={imageA}
            alt="A 이미지"
            fill
            style={{
              maxWidth: "720px",
            }}
          />
          <div className="overlay">
            <OverLayTitle>{titleA}</OverLayTitle>
            <OverlayPercent>{percentageA}%</OverlayPercent>
            <OverlayCount> {totalCountA}명</OverlayCount>
            <OverlayButton> 술정보 보기 &nbsp; {">"}</OverlayButton>
          </div>
        </LeftVote>

        <RightVote
          selected={activeValue("right")}
          onClick={() => onClickVote("B")}
          percent={percentageB > 0 ? percentageB : 0}
        >
          <Image src={imageB} alt="B 이미지" fill />
          <div className="overlay">
            <OverLayTitle>{titleB}</OverLayTitle>
            <OverlayPercent>{percentageB}%</OverlayPercent>
            <OverlayCount> {totalCountB}명</OverlayCount>
            <OverlayButton> 술정보 보기 &nbsp; {">"}</OverlayButton>
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
  width: 100%;z
  height: 100%;
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
  display: flex;
  justify-content: center;
  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 0%;
    visibility: hidden;
    height: calc(100% - 4px);
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 0 20px;
    color: white;
    background: rgba(250, 94, 45, 0.7);
    border-radius: 10px;
    border: 2px solid #ff4a16;
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
  ${({ theme }) => theme.typography.body01}
  padding-top: 26px;
`;

const OverlayPercent = styled.div`
  ${({ theme }) => theme.typography.headline01}
  padding-top: 8px;
`;

const OverlayCount = styled.div`
  ${({ theme }) => theme.typography.body03}
`;

const OverlayButton = styled.div`
  ${({ theme }) =>
    css`
      ${theme.typography.chip}
      background-color: ${theme.colors.main_01};
    `}
  display: flex;
  border-radius: 4px;
  margin-top: 8px;
  padding: 6px 8px;
`;

export default VoteDescription;
