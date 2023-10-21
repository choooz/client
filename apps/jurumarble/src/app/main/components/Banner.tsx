'use client';

import Path from 'lib/Path';
import Image from 'next/image';
import Link from 'next/link';
import { mainBanner } from 'public/images';
import styled from 'styled-components';

function Banner() {
  return (
    <Container>
      <Link href={Path.ONBOARDING_PAGE}>
        <Image
          alt="배너"
          src={mainBanner}
          fill
          style={{ borderRadius: '16px' }}
        />
      </Link>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  margin-top: 12px;
  aspect-ratio: 16 / 9;
`;

export default Banner;
