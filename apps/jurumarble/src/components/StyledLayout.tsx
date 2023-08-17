"use client";

import { PropsWithChildren } from "react";
import { styled } from "styled-components";

function StyledLayout({ children }: PropsWithChildren) {
  return <Container>{children}</Container>;
}

const Container = styled.div`
  max-width: 720px;
  margin: 0 auto;
`;

export default StyledLayout;
