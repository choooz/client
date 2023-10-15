"use client";

import BottomBar from "components/BottomBar";
import Header from "components/Header";
import styled, { css } from "styled-components";
import Banner from "./main/components/Banner";
import HotDrinkContainer from "./main/components/HotDrinkContainer";
import HotDrinkVoteContainer from "./main/components/HotDrinkVoteContainer";
import SearchInputWrapper from "./main/components/SearchInputWrapper";
import TodayDrinkRecommendation from "./main/components/TodayDrinkRecommendation";

function MainPage() {
  return (
    <>
      <Header />
      <TodayDrinkRecommendation />
      <TopSection>
        <Banner />
        <SearchInputWrapper />
        <HotDrinkContainer />
      </TopSection>
      <DivideLine />
      <BottomSection>
        <HotDrinkVoteContainer />
      </BottomSection>
      <BottomBar />
    </>
  );
}

const TopSection = styled.section`
  padding: 0 20px;
`;

const BottomSection = styled.section`
  padding: 0 20px 96px; // 64(BottomBar height) + 32(margin) = 96
  margin-top: 8px;
  overflow: auto;
`;

const DivideLine = styled.div`
  ${({ theme }) => css`
    background-color: ${theme.colors.bg_01};
    height: 8px;
    margin: 40px 0 8px 0;
  `}
`;

export default MainPage;
