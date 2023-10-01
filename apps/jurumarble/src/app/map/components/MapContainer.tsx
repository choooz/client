"use client";

import { Button } from "components/button";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import useDrinksMapService from "../services/useDrinksMapService";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import { useToggle } from "@react-hookz/web";
import RegionBottomSheet from "./RegionBottomsheet";
const MapContainer = () => {
  const [on, toggle] = useToggle();
  const mapRef = useRef<kakao.maps.Map>(null);
  const [mapXY, setMapXY] = useState({
    startX: 0,
    startY: 0,
    endX: 0,
    endY: 0,
  });

  const { drinksList, subscribe } = useDrinksMapService({
    startX: mapXY.startX,
    startY: mapXY.startY,
    endX: mapXY.endX,
    endY: mapXY.endY,
    page: 0,
    size: 100,
  });
  const [state, setState] = useState({
    // 지도의 초기 위치 서울 시청
    center: { lat: 37.5662952, lng: 126.9779 },
    // 지도 위치 변경시 panto를 이용할지에 대해서 정의
    isPanto: false,
  });

  useEffect(() => {
    // 윈도우 리사이즈 실행
    setTimeout(() => {
      window.dispatchEvent(new Event("resize"));
    }, 1000);
  }, []);

  return (
    <Container>
      <TopBox>
        <SettingWrapper>
          <h1 className="title">
            여행지 근처의
            <br /> 우리술을 찾아드려요
          </h1>

          <Button variant="primary" height="40px" width="82px" onClick={toggle}>
            직접 설정
          </Button>
        </SettingWrapper>
        <div className="description">
          여행지를 설정하면 <br />
          여행지의 우리술을 확인할 수 있어요
        </div>
      </TopBox>
      <MapBox>
        <Map // 지도를 표시할 Container
          center={state.center}
          isPanto={state.isPanto}
          style={{
            // 지도의 크기
            width: "100%",
            height: "375px",
          }}
          ref={mapRef}
          level={14} // 지도의 확대 레벨
          onIdle={() => {
            const map = mapRef.current;
            if (map) {
              const bounds = map.getBounds();
              const ne = bounds.getNorthEast();
              const sw = bounds.getSouthWest();
              setMapXY({
                startX: sw.getLat(),
                startY: sw.getLng(),
                endX: ne.getLat(),
                endY: ne.getLng(),
              });
            }
          }}
        >
          <MapMarker // 마커를 생성합니다
            position={{
              // 마커가 표시될 위치입니다
              lat: 37.5662952,
              lng: 126.9779,
            }}
          />
          {drinksList.map(({ latitude, longitude }) => (
            <MapMarker // 마커를 생성합니다
              position={{
                // 마커가 표시될 위치입니다
                lat: latitude,
                lng: longitude,
              }}
            />
          ))}
        </Map>
      </MapBox>
      <RegionBottomSheet onToggleDrinkSearchModal={toggle} on={on} />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const TopBox = styled.section`
  padding: 20px;
  .title {
    color: ${({ theme }) => theme.colors.black_01};
    text-align: left;
    ${({ theme }) => theme.typography.headline02};
    padding-bottom: 8px;
  }

  .description {
    color: ${({ theme }) => theme.colors.black_02};
    ${({ theme }) => theme.typography.body_long03};
  }
`;

const SettingWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const MapBox = styled.div``;

export default MapContainer;
