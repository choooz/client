import { media } from "@chooz/ui/styles/media";
import React from "react";
import styled from "styled-components";

interface Props {
  children: React.ReactNode;
}

function TargetMessage({ children }: Props) {
  return <Message>{children}</Message>;
}

const Message = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4.4px 6px 4.4px;
  height: 24px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.palette.main.point};
  color: ${({ theme }) => theme.palette.ink.lightest};
  ${media.medium} {
    height: 28px;
  }
`;

export default TargetMessage;
