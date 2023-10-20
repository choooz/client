'use client';

import { useEffect } from 'react';

import Path from 'lib/Path';
import userStorage from 'lib/utils/userStorage';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { mainBanner } from 'public/images';
import styled from 'styled-components';

function Banner() {
  const router = useRouter();
  useEffect(() => {
    if (!userStorage.get() || !!localStorage.getItem('visited_home')) {
      return;
    }
    router.push(Path.ONBOARDING_PAGE);
    localStorage.setItem('visited_home', 'false');
  }, []);
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
