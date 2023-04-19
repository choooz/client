import React from "react";
import styled, { css } from "styled-components";
import { AorB } from "types/vote";

interface Props {
  A: number;
  B: number;
  select: AorB | null;
}

function VoteAnalyzeBar({ A, B, select }: Props) {
  return (
    <AnalyzeBar>
      <Share share={A}>
        {A}% &nbsp;
        <div className="number">(340명)</div>
      </Share>
      <Share selected share={B}>
        {B}% &nbsp;
        <div className="number">(345명)</div>
      </Share>
    </AnalyzeBar>
  );
}

const AnalyzeBar = styled.div`
  margin: 20px 0;
  width: 100%;
  height: 40px;
  background-color: ${({ theme }) => theme.palette.background.soft};
  border-radius: 4px;
  display: flex;
  align-items: center;
`;

const Share = styled.div<{ share: number; selected?: boolean }>`
  border-radius: 4px;
  font-weight: 700;
  height: 40px;
  display: flex;
  align-items: center;
  padding: 0 10px;
  ${({ theme, share, selected }) => css`
    background: ${theme.palette.main.sub};
    color: ${theme.palette.ink.lightest};
    ${theme.textStyle.Font_Regular};
    width: ${share}%;
    ${!selected && `visibility: hidden`};
  `}
  .number {
    font-weight: 500;
  }
`;

export default VoteAnalyzeBar;
