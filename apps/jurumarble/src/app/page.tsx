"use client";

import BottomBar from "components/BottomBar";
import Header from "components/Header";
import Image from "next/image";
import { EmptyAImg } from "public/images";
import styled, { css } from "styled-components";
import Carousel from "./main/components/Carousel";
// import { Input } from "@monorepo/ui";

function Main() {
  return (
    <Container>
      <TopSection>
        <Header />
        <Banner />
        <Input />
        <H2>
          우리술
          <Main01Color> TOP 10</Main01Color>
        </H2>
        <H3>7시, 지금 가장 인기있는 우리술이에요.</H3>
        <Carousel />
      </TopSection>
      <BottomSection>
        <H2>
          우리술
          <Main01Color> 투표</Main01Color>
        </H2>
        <H3>7시, 지금 가장 인기있는 우리술 투표에요.</H3>
        <PopularVoteCard>
          <VoteImages>
            <DrinkImageBox color="orange">
              <DrinkImageWrapper>
                <Image alt="임시 이미지" src={EmptyAImg} fill style={{ borderRadius: "80px" }} />
              </DrinkImageWrapper>
            </DrinkImageBox>
            <DrinkImageBox color="mint">
              <DrinkImageWrapper>
                <Image alt="임시 이미지" src={EmptyAImg} fill style={{ borderRadius: "80px" }} />
              </DrinkImageWrapper>
            </DrinkImageBox>
          </VoteImages>
          <VoteTitleWrapper>
            <VoteTitle>부산에서 제일 맛있는 술은?</VoteTitle>
          </VoteTitleWrapper>
        </PopularVoteCard>
      </BottomSection>
      <BottomBar />
    </Container>
  );
}

const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.bg_01};
`;

const TopSection = styled.section`
  padding: 0 20px;
  background-color: ${({ theme }) => theme.colors.white};
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

const BottomSection = styled.section`
  padding: 0 20px 96px;
  margin-top: 8px; // 64(BottomBar height) + 32(margin) = 96
  background-color: ${({ theme }) => theme.colors.white};
  overflow: auto;
`;

const PopularVoteCard = styled.div`
  ${({ theme }) =>
    css`
      background-color: ${theme.colors.bg_02};
      width: auto;
      margin-top: 32px;
      overflow: auto;
      border: 1px solid ${theme.colors.bg_02};
      border-radius: 16px;
      box-shadow: 0px 0px 1px 0px rgba(0, 0, 0, 0.08), 0px 10px 25px 0px rgba(0, 0, 0, 0.06);
    `}
`;

const VoteImages = styled.div`
  display: flex;
  width: auto;
  height: 120px;
  gap: 11px;
  margin: 20px;
`;

const DrinkImageBox = styled.div<{ color: string }>`
  ${({ theme, color }) =>
    css`
      background-color: ${color === "orange" ? theme.colors.sub_01 : theme.colors.sub_02};
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      border-radius: 10px;
    `}
`;

const DrinkImageWrapper = styled.div`
  width: 80px;
  height: 80px;
  position: relative;
`;

const VoteTitleWrapper = styled.div`
  ${({ theme }) =>
    css`
      background-color: ${theme.colors.white};
      padding: 20px 0;
    `}
`;

const VoteTitle = styled.div`
  ${({ theme }) =>
    css`
      ${theme.typography.headline03};
      color: ${theme.colors.black_01};
      padding: 0 20px;
    `}
`;

export default Main;
