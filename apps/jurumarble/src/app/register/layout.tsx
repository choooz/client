'use client';

import { PropsWithChildren } from 'react';

import styled from 'styled-components';

import { GlobalHeader } from './components';
import { RegisterProvider } from './contexts';
import { RegisterFooterSection } from './sections';

export default function Layout({ children }: PropsWithChildren) {
  return (
    <RegisterProvider>
      <StyledLayout>
        <GlobalHeader>회원가입</GlobalHeader>
        {children}
        <RegisterFooterSection />
      </StyledLayout>
    </RegisterProvider>
  );
}

const StyledLayout = styled.div`
  width: 100%;
  position: relative;
`;
