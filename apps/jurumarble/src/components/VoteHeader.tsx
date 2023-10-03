import { ReactNode } from "react";
import styled, { css } from "styled-components";

interface Props {
  leftButton?: ReactNode;
  children: ReactNode;
  rightButton?: ReactNode;
}

function VoteHeader({ leftButton, children, rightButton }: Props) {
  return (
    <Header>
      {leftButton ? leftButton : <EmptySpace />}
      {children}
      {rightButton ? rightButton : <EmptySpace />}
    </Header>
  );
}

const Header = styled.header`
  ${({ theme }) =>
    css`
      ${theme.typography.headline03}
      color: ${theme.colors.black_01};
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 48px;
    `}
`;

const EmptySpace = styled.div`
  width: 24px;
  height: 24px;
`;

export default VoteHeader;
