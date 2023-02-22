import Image, { StaticImageData } from "next/image";
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
}

function DetailAB({ titleA, titleB, imageA, imageB, select }: Props) {
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
        <LeftVote selected={activeValue("left")}>
          <Image
            src={imageA}
            width={272}
            height={340}
            alt="A 이미지"
            style={{
              objectFit: "cover",
              width: "100%",
              height: "340px",
            }}
          />
          <div className="overlay">
            <OverLayTitle>{titleA}</OverLayTitle>
            <OverlayPercent>50%</OverlayPercent>
            <OverlayCount> 340명</OverlayCount>
          </div>
        </LeftVote>

        <RightVote selected={activeValue("right")}>
          <Image
            src={imageB}
            width={272}
            height={340}
            alt="B 이미지"
            style={{
              objectFit: "cover",
              width: "100%",
              height: "340px",
            }}
          />
          <div className="overlay">
            <OverLayTitle>{titleB}</OverLayTitle>
            <OverlayPercent>50%</OverlayPercent>
            <OverlayCount> 340명</OverlayCount>
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

const LeftVote = styled.div<{ selected: ActiveType }>`
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
    ${({ selected }) =>
      selected === "active" &&
      css`
        width: 50%;
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
