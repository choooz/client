'use client';

import { useEffect, useRef, useState } from 'react';

import { CustomOverlayMap, Map, MapMarker } from 'react-kakao-maps-sdk';
import styled from 'styled-components';

const MapContainer = () => {
  const [delayRender, setDelayRender] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setDelayRender(false);
    }, 600);
  }, []);

  const mapRef = useRef<kakao.maps.Map>(null);

  const [state] = useState({
    // 지도의 초기 위치 서울 시청
    center: { lat: 37.37540414702343, lng: 126.63283112271947 },
    // 지도 위치 변경시 panto를 이용할지에 대해서 정의
    isPanto: false,
    level: 10,
  });

  const [INU, setINU] = useState({
    lat: 37.37540414702343,
    lng: 126.63283112271947,
    isOpen: false,
  });

  const [IGG, setIGG] = useState({
    lat: 37.44436428899783,
    lng: 126.45846688321856,
    isOpen: false,
  });

  if (delayRender) {
    return <div>로딩중</div>;
  }

  return (
    <Container>
      <div style={{ position: 'relative', height: '375px' }}>
        <Map // 지도를 표시할 Container
          id="map"
          onLoadStart={() => {
            window.dispatchEvent(new Event('resize'));
          }}
          onLoad={() => {
            mapRef.current?.getNode();
          }}
          center={state.center}
          isPanto={state.isPanto}
          style={{
            // 지도의 크기
            width: '100%',
            height: '375px',
          }}
          ref={mapRef}
          level={state.level} // 지도의 확대 레벨
        >
          <MapMarker
            onClick={() => {
              setINU({ ...INU, isOpen: !INU.isOpen });
            }}
            position={{
              lat: INU.lat,
              lng: INU.lng,
            }}
            key="INU"
          />
          <CustomOverlayMap
            key="overlay-INU"
            position={{
              lat: INU.lat,
              lng: INU.lng,
            }}
          >
            {INU.isOpen && (
              <div
                style={{
                  backgroundColor: 'white',
                  border: '1px solid black',
                  height: '100px',
                  position: 'absolute',
                  width: '200px',
                  zIndex: 999,
                }}
              >
                <div> 애국가 </div>
                <div> 위도 {INU.lat} </div>
                <div> 경도 {INU.lng} </div>
                <a href="https://youtu.be/n6WaTObHRJM?si=i_Yo5DY551SlsHnk">
                  {' '}
                  노래 들으러 가기{' '}
                </a>
              </div>
            )}
          </CustomOverlayMap>
          <MapMarker
            onClick={() => {
              setIGG({ ...IGG, isOpen: !IGG.isOpen });
            }}
            position={{
              lat: IGG.lat,
              lng: IGG.lng,
            }}
            key="IGG"
          />
          <CustomOverlayMap
            key="overlay-IGG"
            position={{
              lat: IGG.lat,
              lng: IGG.lng,
            }}
          >
            {IGG.isOpen && (
              <div
                style={{
                  backgroundColor: 'white',
                  border: '1px solid black',
                  height: '100px',
                  position: 'absolute',
                  width: '200px',
                  zIndex: 999,
                }}
              >
                <div> 제주도의 푸른밤 </div>
                <div> 위도 {IGG.lat} </div>
                <div> 경도 {IGG.lng} </div>
                <a href="https://youtu.be/JhCW-oXzNjE?si=dIc0hpWUIq-D75-y">
                  {' '}
                  노래 들으러 가기{' '}
                </a>
              </div>
            )}
          </CustomOverlayMap>
        </Map>
      </div>
      {/* <FilterBox>
        <RegionSmallSelect
          defaultOption={sortBy}
          onChangeSortOption={onChangeDrinkInfoSortOption}
          options={DRINK_INFO_SORT_LIST}
        />
      </FilterBox> */}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

export default MapContainer;
