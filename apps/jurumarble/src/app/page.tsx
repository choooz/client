"use client";

import BottomBar from "components/BottomBar";
import DivideLine from "components/DivideLine";
import Header from "components/Header";
import { KAKAO_MAP_API_KEY } from "lib/constants";
import Image from "next/image";
import Script from "next/script";
import { MainBannerImage } from "public/images";
import styled from "styled-components";
import HotDrinkContainer from "./main/components/HotDrinkContainer";
import HotDrinkVoteContainer from "./main/components/HotDrinkVoteContainer";
import SearchInputWrapper from "./main/components/SearchInputWrapper";

function MainPage() {
  return (
    <>
      <Script src="https://developers.kakao.com/sdk/js/kakao.js" async />
      <Script
        type="text/javascript"
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_MAP_API_KEY}&libraries=services&autoload=false`}
      ></Script>
      <Header />
      <TopSection>
        <BannerImageWrapper>
          <Image alt="배너" src={MainBannerImage} fill style={{ borderRadius: "16px" }} />
        </BannerImageWrapper>
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

const BannerImageWrapper = styled.div`
  position: relative;
  margin-top: 36px;
  aspect-ratio: 16 / 9;
`;

const BottomSection = styled.section`
  padding: 0 20px 96px; // 64(BottomBar height) + 32(margin) = 96
  margin-top: 8px;
  overflow: auto;
`;

export default MainPage;
