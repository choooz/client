'use client';

import Image from 'next/image';
import { mainBanner } from 'public/images';
import styled from 'styled-components';

function Banner() {
  return (
    <Container>
      <Image
        alt="배너"
        src={mainBanner}
        fill
        style={{ borderRadius: '16px' }}
      />
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  margin-top: 12px;
  aspect-ratio: 16 / 9;
`;

export default Banner;
