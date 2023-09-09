import React from "react";
import styled, { css } from "styled-components";

interface Props {
  onModify?: () => void;
  onShare?: () => void;
  onDelete?: () => void;
  top?: string;
  right?: string;
}

function ModifyDeleteButtonBox({ onModify, onShare, onDelete, top = "0", right = "0px" }: Props) {
  return (
    <Container top={top} right={right}>
      <MenuText className="modify" onClick={onModify}>
        수정하기
      </MenuText>
      <MenuText className="modify" onClick={onShare}>
        공유하기
      </MenuText>
      <MenuText className="delete" onClick={onDelete}>
        삭제하기
      </MenuText>
    </Container>
  );
}

const Container = styled.div<{ top: string; right: string }>`
  z-index: 9999;
  position: absolute;

  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  cursor: pointer;
  ${({ top, right }) => css`
    top: ${top};
    right: ${right};
  `}
  .modify {
  }
  .delete {
    color: ${({ theme }) => theme.colors.system_red};
  }
`;

const MenuText = styled.div`
  padding: 12px 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 48px;
  z-index: 999;
  :hover {
    text-decoration: underline;
  }
`;

export default ModifyDeleteButtonBox;
