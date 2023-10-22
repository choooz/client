'use client';

import { PropsWithChildren } from 'react';

import styled from 'styled-components';

import RegisterHeader from './components/RegisterHeader';
import { RegisterProvider } from './contexts';
import { RegisterFooterSection } from './sections';

export default function Layout({ children }: PropsWithChildren) {
  return (
    <RegisterProvider>
      <StyledLayout>
        <RegisterHeader />
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
