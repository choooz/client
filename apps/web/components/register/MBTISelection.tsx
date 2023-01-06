import { RegisterTemplate, transitions } from "@chooz/ui";
import { Eyes } from "public/images";
import Image from "next/image";
import { MBTIType } from "pages/register";
import React, { MouseEvent } from "react";
import styled, { css } from "styled-components";
import { media } from "styles/media";

interface Props {
  MBTI: MBTIType;
  onChangeMBTI(e: MouseEvent<HTMLButtonElement>): void;
  onAddProgress(number: number): void;
}

function MBTISelection({ MBTI, onChangeMBTI, onAddProgress }: Props) {
  type Direction = "left" | "right";

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
        onClick: () => onAddProgress(1),
        disabled: Object.values(MBTI).includes(null),
      }}
      prevButtonText="이전"
      prevButtonProps={{
        onClick: () => onAddProgress(-1),
      }}
    >
      <VoteBox>
        <LeftVote name="M" selected={activeValue("left", "M")} value="E" onClick={onChangeMBTI}>
          <div>E</div>
          <VoteText>외향형</VoteText>
        </LeftVote>
        <RightVote name="M" selected={activeValue("right", "M")} value="I" onClick={onChangeMBTI}>
          <div>I</div>
          <VoteText>내향형</VoteText>
        </RightVote>
      </VoteBox>
      <VoteBox>
        <LeftVote name="B" selected={activeValue("left", "B")} value="S" onClick={onChangeMBTI}>
          <div>S</div>
          <VoteText>감정형</VoteText>
        </LeftVote>
        <RightVote name="B" selected={activeValue("right", "B")} value="N" onClick={onChangeMBTI}>
          <div>N</div>
          <VoteText>직관형</VoteText>
        </RightVote>
      </VoteBox>
      <VoteBox>
        <LeftVote name="T" selected={activeValue("left", "T")} value="T" onClick={onChangeMBTI}>
          <div>T</div>
          <VoteText>사고형</VoteText>
        </LeftVote>
        <RightVote name="T" selected={activeValue("right", "T")} value="F" onClick={onChangeMBTI}>
          <div>F</div>
          <VoteText>감정형</VoteText>
        </RightVote>
      </VoteBox>
      <VoteBox>
        <LeftVote name="I" selected={activeValue("left", "I")} value="J" onClick={onChangeMBTI}>
          <div>J</div>
          <VoteText>판단형</VoteText>
        </LeftVote>
        <RightVote name="I" selected={activeValue("right", "I")} value="P" onClick={onChangeMBTI}>
          <div>P</div>
          <VoteText> 인식형</VoteText>
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
    border: 1px solid ${({ theme }) => theme.palette.point.purple};
    background-color: ${({ theme }) => theme.palette.main.light};
    font-size: 16px;
    font-weight: 700;
    color: ${({ theme }) => theme.palette.main.darkest};
  `,
  inactive: css`
    width: 23%;
    opacity: 0.5;
  `,
};

const typeGuardVariantStyle = (selected: "active" | "inactive" | null) => {
  if (!selected) return null;
  return variantStyles[selected];
};

const LeftVote = styled.button<{ selected: "active" | "inactive" | null }>`
  position: absolute;
  width: 48%;
  height: 100%;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.palette.background.lightest};
  border: 1px solid ${({ theme }) => theme.palette.border.base};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: 20px;
  transition: all 0.3s ease-in-out;
  ${({ selected }) => typeGuardVariantStyle(selected)}
  &:hover {
    background-color: ${({ theme }) => theme.palette.main.light};
  }
`;

const RightVote = styled(LeftVote)`
  right: 0;
`;

const VoteText = styled.div`
  font-size: 12px;
`;

export default React.memo(MBTISelection);
