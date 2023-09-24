"use client";

import { ReactNode } from "react";
import styled from "styled-components";

interface GlobalHeaderProps {
  children: ReactNode;
}

export const GlobalHeader = ({ children }: GlobalHeaderProps) => {
  return (
    <Wrapper>
      <div />
      <Title>{children}</Title>
      <div />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 4px 12px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.div`
  ${({ theme }) => theme.typography.headline03}
`;
