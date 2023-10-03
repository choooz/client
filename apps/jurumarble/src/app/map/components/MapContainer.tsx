"use client";

import { Button } from "components/button";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import useDrinksMapService from "../services/useDrinksMapService";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import { useToggle } from "@react-hookz/web";
import RegionBottomSheet from "./RegionBottomsheet";
import { ExImg1 } from "public/images";
import RegionSmallSelect from "./RegionSmallSelect";
import { DRINK_INFO_SORT_LIST } from "lib/constants";
import DrinkItem from "app/stamp/components/DrinkItem";
import { useGeoLocation } from "../hooks/useGeoLocation";
import SvgIcMyLocationFloating from "src/assets/icons/ic_my_location_floating.svg";
import Image from "next/image";

const MapContainer = () => {
  const { error, location, toggleOnLocation, onLocation } = useGeoLocation();
  const [on, toggle] = useToggle();
  const mapRef = useRef<kakao.maps.Map>(null);
  const [mapXY, setMapXY] = useState({
    startX: 33.64225953272826,
    startY: 119.06076029979886,
    endX: 40.856225138838,
    endY: 132.02500466772065,
  });

  console.log(location);

  const { drinksList } = useDrinksMapService({
    startX: mapXY.startX,
    startY: mapXY.startY,
    endX: mapXY.endX,
    endY: mapXY.endY,
    page: 0,
    size: 100,
  });
  const [sortBy, setSortBy] = useState("ByPopularity");

  const onChangeDrinkInfoSortOption = (sortOption: string) => {
    setSortBy(sortOption);
  };

  const [state, setState] = useState({
    // 지도의 초기 위치 서울 시청
    center: { lat: 36.75158343784174, lng: 127.90408370095267 },
    // 지도 위치 변경시 panto를 이용할지에 대해서 정의
    isPanto: false,
    level: 13,
  });

  useEffect(() => {
    // 윈도우 리사이즈 실행
    setTimeout(() => {
      window.dispatchEvent(new Event("resize"));
    }, 1000);
  }, []);

  const onIdleMap = () => {
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
  };

  const setChangeMapCenter = (lat: number, lng: number) => {
    setState({
      center: { lat, lng },
      isPanto: true,
      level: 11,
    });
    setTimeout(() => {
      onIdleMap();
    }, 100);
  };

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

      <div style={{ position: "relative" }}>
        <Map // 지도를 표시할 Container
          center={state.center}
          isPanto={state.isPanto}
          style={{
            // 지도의 크기
            width: "100%",
            height: "375px",
          }}
          ref={mapRef}
          level={state.level} // 지도의 확대 레벨
          onIdle={() => onIdleMap()}
        >
          {onLocation && (
            <MapMarker // 마커를 생성합니다
              position={{
                // 마커가 표시될 위치입니다
                lat: location.latitude,
                lng: location.longitude,
              }}
              image={{
                src: "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png",
                size: {
                  width: 64,
                  height: 69,
                },
              }}
            />
          )}
          {drinksList.map(({ latitude, longitude, drinkId }, index) => (
            <MapMarker // 마커를 생성합니다
              key={`${drinkId}-${latitude}-${longitude}-${index}`}
              position={{
                // 마커가 표시될 위치입니다
                lat: latitude,
                lng: longitude,
              }}
            />
          ))}
          <MyLocationButton onClick={toggleOnLocation}>
            <Image src={SvgIcMyLocationFloating} width={40} height={40} alt="내위치 켜기" />
          </MyLocationButton>
        </Map>
      </div>
      <FilterBox>
        <RegionSmallSelect
          defaultOption={sortBy}
          onChangeSortOption={onChangeDrinkInfoSortOption}
          options={DRINK_INFO_SORT_LIST}
        />
      </FilterBox>
      <DrinkBox>
        {drinksList.map(({ drinkId, name, latitude, longitude, image, manufacturer }) => (
          <DrinkItem
            drinkInfo={{
              id: drinkId,
              name: name,
              productName: manufacturer,
              image: image || (ExImg1 as unknown as string),
            }}
            onClickReplaceDrinkInfo={() => {
              setChangeMapCenter(latitude, longitude);
            }}
            selectedDrinkList={[]}
          />
        ))}
      </DrinkBox>
      <RegionBottomSheet
        setChangeMapCenter={setChangeMapCenter}
        onToggleDrinkSearchModal={toggle}
        on={on}
      />
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

const FilterBox = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 16px 20px 32px 20px;
`;

const DrinkBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 0 20px;
`;

const MyLocationButton = styled.div`
  position: absolute;
  z-index: 100;
  left: 20px;
  bottom: 20px;
  width: 40px;
  height: 40px;
  background-color: white;
  border-radius: 50%;
  box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.4), 0px 8px 20px 0px rgba(235, 235, 235, 0.4);
`;

export default MapContainer;
