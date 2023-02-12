
import React from "react";
import styled, { css } from "styled-components";

function CommentToolBar() {
  return (
    <Container>
      <Title>
        댓글 <span className="point">0</span>
        <Select name="" id="">
          <option value="1">최신순</option>
          <option value="2">추천순</option>
          <option value="1">오래된순</option>
        </Select>
      </Title>
      <MoveButton>↓ 마지막 댓글로 이동</MoveButton>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Title = styled.div`
  font-weight: 700;
  ${({ theme }) => css`
    color: ${theme.palette.ink.dark};
    ${theme.textStyle.Font_Minimum}
  `}
  .point {
    color: ${({ theme }) => theme.palette.main.point};
    padding-right: 8px;
  }
`;

const Select = styled.select`
  border: none;
  ${({ theme }) => css`
    color: ${theme.palette.ink.lighter};
    ${theme.textStyle.Font_Minimum}
  `};
`;

const MoveButton = styled.div`
  ${({ theme }) => css`
    color: ${theme.palette.ink.base};
    ${theme.textStyle.Font_Minimum}
  `};
`;

export default CommentToolBar;
