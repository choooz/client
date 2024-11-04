'use client';

import { KAKAO_MAP_API_KEY } from 'lib/constants';
import Script from 'next/script';
import styled from 'styled-components';

import MapContainer from './components/Map';

function TestPage() {
  return (
    <Container>
      <Script src="https://developers.kakao.com/sdk/js/kakao.js" async />
      <Script
        type="text/javascript"
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_MAP_API_KEY}&libraries=services&autoload=false`}
      />
      <div style={{ position: 'relative', height: '500px' }}>
        {/* <MapContainer /> */}
        <MapContainer />
      </div>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

export default TestPage;
