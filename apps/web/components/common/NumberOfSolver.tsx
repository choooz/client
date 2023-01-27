import React from "react";
import styled from "styled-components";
import { media } from "styles/media";

interface Props {
  children: React.ReactNode;
}

function NumberOfSolver({ children }: Props) {
  return <Message>{children}</Message>;
}

const Message = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 106px;
  height: 24px;
  border-radius: 4px;
  margin-left: 4px;
  background-color: ${({ theme }) => theme.palette.background.black};
  color: ${({ theme }) => theme.palette.ink.lightest};
  ${media.medium} {
    width: 110px;
    height: 28px;
  }
`;

export default NumberOfSolver;
