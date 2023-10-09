"use client";

import BottomBar from "components/BottomBar";
import Header from "components/Header";
import React from "react";
import MapContainer from "./components/MapContainer";

declare global {
  interface Window {
    kakao: any;
  }
}
const MapPage = () => {
  return (
    <>
      <Header />
      <MapContainer />
      <BottomBar />
    </>
  );
};

export default MapPage;
