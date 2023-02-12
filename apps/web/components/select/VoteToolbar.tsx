import NumberOfSolver from "components/common/NumberOfSolver";
import TargetMessage from "components/common/TargetMessage";
import Image from "next/image";
import { HambergerIcon, SaveIcon } from "public/icons";
import React from "react";
import styled from "styled-components";
import MenuBox from "./MenuBox";

interface Props {
  onChangeToggleDetail(): void;
  onChangeToggleMenu(): void;
  toggleMenu: boolean;
  targetEl: React.RefObject<HTMLImageElement>;
}

function VoteToolbar({ onChangeToggleDetail, onChangeToggleMenu, toggleMenu, targetEl }: Props) {
  return (
    <>
      <TagRow>
        <FlexRow>
          <NumberOfSolver>🔥3,645명 해결중!</NumberOfSolver>
          <TargetMessage>당신을 기다렸어요</TargetMessage>
        </FlexRow>
        <FlexRow>
          <Image src={SaveIcon} alt="저장하기" width={32} height={32} />
          <Image
            ref={targetEl}
            src={HambergerIcon}
            alt="매뉴"
            width={32}
            height={32}
            onClick={onChangeToggleMenu}
          />
        </FlexRow>
      </TagRow>
      <TitleRow>
        무엇이 좋을까요? 공백포함 34자 정도까지네요 여기까지입니다요
        <DateText>22.02.03</DateText>
      </TitleRow>
      {toggleMenu && <MenuBox onChangeToggleDetail={onChangeToggleDetail} />}
    </>
  );
}

const TagRow = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 12px;
`;

const TitleRow = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 8px 0 11px 0;
  ${({ theme }) => theme.textStyle.Title_Small}
  font-weight: 700;
`;

const DateText = styled.div`
  color: ${({ theme }) => theme.palette.ink.light};
  font-weight: 400;
  font-family: NeoDunggeunmo, Pretendard Variable, -apple-system, BlinkMacSystemFont, system-ui,
    Roboto, "Helvetica Neue";
`;

const FlexRow = styled.div`
  display: flex;
  gap: 4px;
`;

export default VoteToolbar;
