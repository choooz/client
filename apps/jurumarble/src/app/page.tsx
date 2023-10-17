"use client";

import BottomBar from "components/BottomBar";
import Header from "components/Header";
import styled, { css } from "styled-components";
import dynamic from "next/dynamic";

const DynamicHotDrinkVoteContainer = dynamic(
  () => import("./main/components/HotDrinkVoteContainer"),
);

const DynamicHotDrinkContainer = dynamic(() => import("./main/components/HotDrinkContainer"), {
  ssr: false,
  loading: () => (
    <div
      style={{
        height: "200px",
      }}
    />
  ),
});

const DynamicTodayDrinkRecommendation = dynamic(
  () => import("./main/components/TodayDrinkRecommendation"),
);

const DynamicSearchInputWrapper = dynamic(() => import("./main/components/SearchInputWrapper"));

const DynamicBanner = dynamic(() => import("./main/components/Banner"));

function MainPage() {
  return (
    <>
      <Header />
      <DynamicTodayDrinkRecommendation />
      <TopSection>
        <DynamicBanner />
        <DynamicSearchInputWrapper />
        <DynamicHotDrinkContainer />
      </TopSection>
      <DivideLine />
      <BottomSection>
        <DynamicHotDrinkVoteContainer />
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
