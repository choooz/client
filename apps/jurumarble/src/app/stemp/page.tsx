"use client";

import BottomBar from "components/BottomBar";
import Header from "components/Header";
import RegionSelect from "components/RegionSelect";
import Image from "next/image";
import { DrinkImage } from "public/images";
import { useState } from "react";
import styled, { css } from "styled-components";

function StempPage() {
  const [regionOption, setRegionOption] = useState("");
  const onChangeRegionOption = (value: string) => {
    setRegionOption(value);
  };
  return (
    <>
      <Header />
      <Section>
        <div>
          <H2>
            나의 <br /> 우리술 도장
          </H2>
          <H3>
            <MainColor>N</MainColor>
            개의 술을 마셨어요.
          </H3>
        </div>
        <Image
          alt="전통주"
          src={DrinkImage}
          style={{ width: "82px", height: "82px", borderRadius: "100px" }}
        />
      </Section>
      <DrinkStempContainer>
        <RegionSelect regionOption={regionOption} onChangeRegionOption={onChangeRegionOption} />
        <DrinkList></DrinkList>
      </DrinkStempContainer>
      <BottomBar />
    </>
  );
}

const Section = styled.section`
  ${({ theme }) => css`
    background-color: ${theme.colors.bg_02};
    color: ${theme.colors.black_01};
    padding: 20px;
    display: flex;
    justify-content: space-between;
  `}
`;

const H2 = styled.h2`
  ${({ theme }) => css`
    ${theme.typography.headline02}
  `}
`;

const H3 = styled.h3`
  ${({ theme }) => css`
    ${theme.typography.body_long03}
    color: ${theme.colors.black_02};
    margin-top: 8px;
  `}
`;

const MainColor = styled.span`
  ${({ theme }) => css`
    color: ${theme.colors.main_01};
  `}
`;

const DrinkStempContainer = styled.section`
  padding: 24px 20px;
`;

const DrinkList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 8px;
  overflow: auto;
  height: 400px;
  -ms-overflow-style: none /* IE and Edge 스크롤바 없애는 css*/;
  scrollbar-width: none; /* Firefox 스크롤바 없애는 css */
  &::-webkit-scrollbar {
    display: none; /* Chrome , Safari , Opera 스크롤바 없애는 css*/
  }
`;

export default StempPage;
