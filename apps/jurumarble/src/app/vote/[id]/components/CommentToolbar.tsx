import React from "react";
import styled, { css } from "styled-components";

interface Props {
  commentCount: number;
  sortBy?: string;
  onChangeFilter: (sort: string) => void;
}

function CommentToolBar({ commentCount, onChangeFilter, sortBy }: Props) {
  return (
    <Container>
      <Title>
        댓글 <span className="point">{commentCount}</span>
      </Title>
      <ButtonGroup>
        <Button onClick={() => onChangeFilter("인기순")} bold={sortBy === "인기순"}>
          인기순
        </Button>
        <Divider />
        <Button onClick={() => onChangeFilter("최신순")} bold={sortBy === "최신순"}>
          최신순
        </Button>
      </ButtonGroup>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 40px;
`;

const Title = styled.div`
  font-weight: 700;
  ${({ theme }) => css`
    color: ${theme.colors.black_02};
    ${theme.typography.headline04}
  `}
  .point {
    color: ${({ theme }) => theme.colors.main_01};
    padding-right: 8px;
  }
`;

const ButtonGroup = styled.div`
  border: none;
  display: flex;
  align-items: center;
  gap: 8px;

  ${({ theme }) => css`
    ${theme.typography.headline04}
  `};
`;

const Divider = styled.div`
  width: 1px;
  height: 12px;
  background-color: ${({ theme }) => theme.colors.line_01};
`;

const Button = styled.div<{ bold: boolean }>`
  ${({ theme, bold }) =>
    bold
      ? css`
          color: ${theme.colors.black_02};
        `
      : css`
          color: ${theme.colors.black_04};
        `};
`;

export default CommentToolBar;
