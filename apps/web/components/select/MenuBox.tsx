import React from "react";
import styled from "styled-components";

interface Props {
  onChangeToggleDetail: () => void;
}

function MenuBox({ onChangeToggleDetail }: Props) {
  return (
    <Container>
      <MenuText className="modify" onClick={onChangeToggleDetail}>
        수정하기
      </MenuText>
      <MenuText className="delete">삭제하기</MenuText>
    </Container>
  );
}

const Container = styled.div`
  position: absolute;
  top: 70px;
  right: 41px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.palette.background.white};
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  cursor: pointer;
  .modify {
    border-bottom: 1px solid ${({ theme }) => theme.palette.border.base};
  }
  .delete {
    color: ${({ theme }) => theme.palette.system.danger};
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

export default MenuBox;
