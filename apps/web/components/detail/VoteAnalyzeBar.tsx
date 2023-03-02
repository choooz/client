import React from "react";
import styled, { css } from "styled-components";
import { AorB } from "types/vote";

interface Props {
  percentageA: number;
  percentageB: number;
  totalCountA: number;
  totalCountB: number;
  select: AorB | null;
}

function VoteAnalyzeBar({ percentageA, percentageB, totalCountA, totalCountB, select }: Props) {
  return (
    <>
      {totalCountA + totalCountB === 0 ? (
        <AnalyzeBar>
          <Share selected share={100}>
            아직 투표가 없습니다.
          </Share>
        </AnalyzeBar>
      ) : (
        <AnalyzeBar>
          <Share selected={select === "A"} share={percentageA}>
            {percentageA}% &nbsp;
            <div className="number">{totalCountA.toLocaleString()}명</div>
          </Share>
          <Share selected={select === "B"} share={percentageB}>
            {percentageB}% &nbsp;
            <div className="number">{totalCountB.toLocaleString()}명</div>
          </Share>
        </AnalyzeBar>
      )}
    </>
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
