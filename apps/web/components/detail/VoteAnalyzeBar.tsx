import React from "react";
import styled, { css } from "styled-components";

interface Props {
  A: number;
  B: number;
  select: "A" | "B";
}

function VoteAnalyzeBar({ A, B, select }: Props) {
  return (
    <AnalyzeBar>
      <ShareA selected share={A}>
        {A}% &nbsp;
        <div className="number">(340명)</div>
      </ShareA>
      <ShareB selected={false} share={B}>
        {B}% &nbsp;
        <div className="number">(340명)</div>
      </ShareB>
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

const ShareA = styled.div<{ share: number; selected: boolean }>`
  border-radius: 4px;
  width: ${({ share }) => share}%;
  background-color: ${({ theme }) => theme.palette.main.sub};
  color: ${({ theme }) => theme.palette.ink.lightest};
  font-size: ${({ theme }) => theme.fontSize.xSmall};
  font-weight: 700;
  height: 40px;
  display: flex;
  align-items: center;
  padding: 0 10px;
  .number {
    font-weight: 500;
  }
  ${({ selected }) =>
    !selected &&
    css`
      display: none;
    `}
`;

const ShareB = styled(ShareA)``;

export default VoteAnalyzeBar;
