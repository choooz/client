"use client";

import BottomBar from "components/BottomBar";
import Header from "components/Header";
import styled, { css } from "styled-components";
import Carousel from "./main/components/Carousel";

// import { Input } from "@monorepo/ui";

function Main() {
  return (
    <Container>
      <Header />
      <Banner />
      <Input />
      <H2>
        우리술
        <Main01Color> TOP 10</Main01Color>
      </H2>
      <H3>7시, 지금 가장 인기있는 우리술이에요.</H3>
      <Carousel />
      <DivideLine />
      <H2>
        우리술
        <Main01Color> 투표</Main01Color>
      </H2>
      <H3>7시, 현재 가장 핫한 우리 술이에요.</H3>
      <BottomBar />
    </Container>
  );
}

const Container = styled.div`
  padding: 0 20px;
`;

const Banner = styled.div`
  margin-top: 36px;
  background-color: ${({ theme }) => theme.colors.main_01};
  aspect-ratio: 16 / 9;
`;

const Input = styled.input`
  width: 100%;
  height: 24px;
  margin-top: 28px;
`;

const H2 = styled.h2`
  ${({ theme }) =>
    css`
      ${theme.typography.headline01};
      margin-top: 40px;
    `}
`;

const Main01Color = styled.span`
  color: ${({ theme }) => theme.colors.main_01};
`;

const H3 = styled.h3`
  ${({ theme }) =>
    css`
      ${theme.typography.subhead01};
      color: ${theme.colors.black_02};
      margin-top: 8px;
    `}
`;

const DivideLine = styled.div`
  height: 8px;
  margin-top: 40px;
  background-color: ${({ theme }) => theme.colors.bg_01};
`;

export default Main;
