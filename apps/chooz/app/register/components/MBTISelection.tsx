import { RegisterTemplate, transitions } from "@monorepo/ui";
import { Eyes } from "public/images";
import Image from "next/image";
import React, { MouseEvent } from "react";
import styled, { css } from "styled-components";
import { media } from "@monorepo/ui/styles/media";
import { MBTIType } from "types/user";

interface Props {
  MBTI: MBTIType;
  onChangeMBTI(e: MouseEvent<HTMLButtonElement>): void;
  onChangeProgress(number: number): void;
}
type Direction = "left" | "right";
type ActiveType = "active" | "inactive" | null;

function MBTISelection({ MBTI, onChangeMBTI, onChangeProgress }: Props) {
  const getMBTI = (direction: Direction, MBTIKey: "M" | "B" | "T" | "I") => {
    const lookupTable: Record<Direction, Record<"M" | "B" | "T" | "I", string>> = {
      left: { M: "E", B: "S", T: "T", I: "J" },
      right: { M: "I", B: "N", T: "F", I: "P" },
    };
    return lookupTable[direction][MBTIKey];
  };

  const activeValue = (
    direction: Direction,
    MBTIKey: "M" | "B" | "T" | "I",
  ): "active" | "inactive" | null => {
    if (!MBTI[MBTIKey]) return null;
    return `${MBTI[MBTIKey] === getMBTI(direction, MBTIKey) ? "" : "in"}active`;
  };

  return (
    <RegisterTemplate
      welcomeText={
        <>
          <Image src={Eyes} alt="캐릭터" width={30} />
          반가워요!
        </>
      }
      question="Lv.1 당신의&nbsp MBTI는?"
      search="MBTI"
      nextButtonText="다음"
      nextButtonProps={{
        onClick: () => onChangeProgress(1),
        disabled: Object.values(MBTI).includes(null),
      }}
      prevButtonText="이전"
      prevButtonProps={{
        onClick: () => onChangeProgress(-1),
      }}
    >
      <VoteBox>
        <LeftVote name="M" selected={activeValue("left", "M")} value="E" onClick={onChangeMBTI}>
          <MbtiType>E</MbtiType>
          <MbtiText>외향형</MbtiText>
        </LeftVote>
        <RightVote name="M" selected={activeValue("right", "M")} value="I" onClick={onChangeMBTI}>
          <MbtiType>I</MbtiType>
          <MbtiText>내향형</MbtiText>
        </RightVote>
      </VoteBox>
      <VoteBox>
        <LeftVote name="B" selected={activeValue("left", "B")} value="S" onClick={onChangeMBTI}>
          <MbtiType>S</MbtiType>
          <MbtiText>감정형</MbtiText>
        </LeftVote>
        <RightVote name="B" selected={activeValue("right", "B")} value="N" onClick={onChangeMBTI}>
          <MbtiType>N</MbtiType>
          <MbtiText>직관형</MbtiText>
        </RightVote>
      </VoteBox>
      <VoteBox>
        <LeftVote name="T" selected={activeValue("left", "T")} value="T" onClick={onChangeMBTI}>
          <MbtiType>T</MbtiType>
          <MbtiText>사고형</MbtiText>
        </LeftVote>
        <RightVote name="T" selected={activeValue("right", "T")} value="F" onClick={onChangeMBTI}>
          <MbtiType>F</MbtiType>
          <MbtiText>감정형</MbtiText>
        </RightVote>
      </VoteBox>
      <VoteBox>
        <LeftVote name="I" selected={activeValue("left", "I")} value="J" onClick={onChangeMBTI}>
          <MbtiType>J</MbtiType>
          <MbtiText>판단형</MbtiText>
        </LeftVote>
        <RightVote name="I" selected={activeValue("right", "I")} value="P" onClick={onChangeMBTI}>
          <MbtiType>P</MbtiType>
          <MbtiText> 인식형</MbtiText>
        </RightVote>
      </VoteBox>
    </RegisterTemplate>
  );
}

const VoteBox = styled.div`
  position: relative;
  width: 100%;
  height: 56px;
  margin: 7px 0;
  ${media.medium} {
    height: 74px;
    margin: 17px 0;
  }
`;

const variantStyles = {
  active: css`
    animation: ${transitions.blink} 0.7s ease-in-out;
    width: 74%;
    border: 1px solid ${({ theme }) => theme.palette.main.point};
    background-color: ${({ theme }) => theme.palette.background.selected};
    font-size: 16px;
    font-weight: 700;
    color: ${({ theme }) => theme.palette.main.sub};
  `,
  inactive: css`
    width: 23%;
    opacity: 0.5;
  `,
};

const typeGuardVariantStyle = (selected: ActiveType) => {
  if (!selected) return null;
  return variantStyles[selected];
};

const LeftVote = styled.button<{ selected: ActiveType }>`
  position: absolute;
  width: 48%;
  height: 100%;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.palette.background.white};
  border: 1px solid ${({ theme }) => theme.palette.border.base};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  transition: all 0.3s ease-in-out;
  ${({ selected }) => typeGuardVariantStyle(selected)}
  &:hover {
    border-color: ${({ theme }) => theme.palette.main.point};
    color: ${({ theme }) => theme.palette.main.point};
    font-weight: 800;
  }
`;

const RightVote = styled(LeftVote)`
  right: 0;
`;

const MbtiType = styled.div`
  ${({ theme }) => theme.textStyle.Title_Large}
  font-weight: 800;
`;

const MbtiText = styled.div`
  ${({ theme }) => theme.textStyle.Font_Minimum}
`;

export default React.memo(MBTISelection);
