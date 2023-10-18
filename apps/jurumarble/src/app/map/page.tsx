'use client';

import BottomBar from 'components/BottomBar';
import Header from 'components/Header';
import { KAKAO_MAP_API_KEY } from 'lib/constants';
import dynamic from 'next/dynamic';
import Script from 'next/script';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    kakao: any;
  }
}

const DynamicMapContainer = dynamic(() => import('./components/MapContainer'));

const MapPage = () => {
  return (
    <>
      <Script src="https://developers.kakao.com/sdk/js/kakao.js" async />
      <Script
        type="text/javascript"
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_MAP_API_KEY}&libraries=services&autoload=false`}
      />
      <Header />
      <DynamicMapContainer />
      <BottomBar />
    </>
  );
};

export default MapPage;
