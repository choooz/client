"use client";

import BottomBar from "components/BottomBar";
import Header from "components/Header";
import React from "react";
import MapContainer from "./components/MapContainer";
import { KAKAO_MAP_API_KEY } from "lib/constants";
import Script from "next/script";

declare global {
  interface Window {
    kakao: any;
  }
}
const MapPage = () => {
  return (
    <>
      <Script src="https://developers.kakao.com/sdk/js/kakao.js" async />
      <Script
        type="text/javascript"
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_MAP_API_KEY}&libraries=services&autoload=false`}
      ></Script>
      <Header />
      <MapContainer />
      <BottomBar />
    </>
  );
};

export default MapPage;
