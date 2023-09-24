import { ReactNode } from "react";
import styled from "styled-components";

interface TooltipProps {
  children: ReactNode;
  className?: string;
}

export const Tooltip = ({ children, className }: TooltipProps) => {
  return (
    <Wrapper className={className}>
      <Typography>{children}</Typography>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 10px;
  color: ${({ theme }) => theme.colors.white};
  background: ${({ theme }) => theme.colors.black_03};
  border-radius: 4px;
  width: max-content;
`;

const Typography = styled.p`
  ${({ theme }) => theme.typography.caption};
`;
