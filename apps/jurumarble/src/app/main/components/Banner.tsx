"use client";

import styled, { css } from "styled-components";
import Image from "next/image";
import { MainBannerImage } from "public/images";

function Banner() {
  return (
    <Container>
      <Image alt="배너" src={MainBannerImage} fill style={{ borderRadius: "16px" }} />
      <BannerText>
        <MainText>여행의 즐거움을 우리술과 함께 레벨업!</MainText>
        <SubText>
          여행지에서 우리술이 고민된다면 <br /> 주루마블에서 해결해보세요
        </SubText>
      </BannerText>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  margin-top: 12px;
  aspect-ratio: 16 / 9;
`;

const BannerText = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  padding: 20px;
`;

const MainText = styled.div`
  ${({ theme }) => css`
    ${theme.typography.headline03}
  `};
`;

const SubText = styled.div`
  ${({ theme }) => css`
    ${theme.typography.body_long03}
    margin-top: 8px;
  `};
`;
export default Banner;
