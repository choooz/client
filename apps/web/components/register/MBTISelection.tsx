import { RegisterTemplate, transitions } from "@chooz/ui";
import { Eyes } from "assets/images";
import Image from "next/image";
import React, { MouseEvent } from "react";
import styled, { css } from "styled-components";
import { media } from "styles/media";
import { palette } from "styles/palette";

export interface MBTIType {
  M: "E" | "I" | "";
  B: "S" | "N" | "";
  T: "T" | "F" | "";
  I: "J" | "P" | "";
}

interface Props {
  MBTI: MBTIType;
  onChangeMBTI(e: MouseEvent<HTMLButtonElement>): void;
  onAddProgress(number: number): void;
}

function MBTISelection({ MBTI, onChangeMBTI, onAddProgress }: Props) {
  return (
    <RegisterTemplate
      welcomeText={
        <>
          <Image src={Eyes} alt="캐릭터" width={30} />
          반가워요!
        </>
      }
      questionText={
        <>
          Lv.1 당신의&nbsp;<StrongText>MBTI</StrongText>는?
        </>
      }
      buttonBox={
        <>
          <Back onClick={() => onAddProgress(-1)}>이전</Back>
          <Button onClick={() => onAddProgress(1)} disabled={Object.values(MBTI).includes("")}>
            다음
          </Button>
        </>
      }
    >
      <VoteBox>
        <LeftVote name="M" selected={MBTI.M === "E"} value="E" onClick={onChangeMBTI}>
          <div>E</div>
          <VoteText>외향형</VoteText>
        </LeftVote>
        <RightVote name="M" selected={MBTI.M === "I"} value="I" onClick={onChangeMBTI}>
          <div>I</div>
          <VoteText>내향형</VoteText>
        </RightVote>
      </VoteBox>
      <VoteBox>
        <LeftVote name="B" selected={MBTI.B === "S"} value="S" onClick={onChangeMBTI}>
          <div>S</div>
          <VoteText>감정형</VoteText>
        </LeftVote>
        <RightVote name="B" selected={MBTI.B === "N"} value="N" onClick={onChangeMBTI}>
          <div>N</div>
          <VoteText>직관형</VoteText>
        </RightVote>
      </VoteBox>
      <VoteBox>
        <LeftVote name="T" selected={MBTI.T === "T"} value="T" onClick={onChangeMBTI}>
          <div>T</div>
          <VoteText>사고형</VoteText>
        </LeftVote>
        <RightVote name="T" selected={MBTI.T === "F"} value="F" onClick={onChangeMBTI}>
          <div>F</div>
          <VoteText>감정형</VoteText>
        </RightVote>
      </VoteBox>
      <VoteBox>
        <LeftVote name="I" selected={MBTI.I === "J"} value="J" onClick={onChangeMBTI}>
          <div>J</div>
          <VoteText>판단형</VoteText>
        </LeftVote>
        <RightVote name="I" selected={MBTI.I === "P"} value="P" onClick={onChangeMBTI}>
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

const LeftVote = styled.button<{ selected: boolean }>`
  position: absolute;
  width: 48%;
  height: 100%;
  border-radius: 4px;
  background-color: ${palette.border.lighter};
  border: 1px solid ${palette.border.lightest};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: 20px;
  transition: all 0.3s ease-in-out;
  &:hover {
    background-color: rgba(140, 130, 255, 50%);
  }
  ${({ selected }) =>
    selected
      ? css`
          animation: ${transitions.blink} 0.7s 0.3s ease-in-out;
          width: 91%;
          border: 1px solid #863dff;
          background-color: rgba(140, 130, 255, 50%);
          font-size: 20px;
          font-weight: 700;
          color: #190665;
          z-index: 999;
        `
      : css`
          z-index: 1;
        `}
`;

const RightVote = styled(LeftVote)`
  right: 0;
`;

const VoteText = styled.div`
  font-size: 12px;
`;

const Button = styled.button`
  width: 76%;
  height: 56px;
  background-color: #863dff;
  color: white;
  border-radius: 4px;
  animation: ${transitions.delaypopInFromBottom} 1.5s normal ease-in-out;
  font-weight: 700;
  transition: all 0.3s ease-in-out;
  :disabled {
    background-color: #e5e5ec;
    color: #999999;
  }
`;

const StrongText = styled.strong`
  color: #6f4ef5;
`;

const Back = styled.button`
  font-size: 16px;
  font-weight: 700;
  color: #999999;
  height: 56px;
  width: 24%;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${transitions.delaypopInFromBottom} 1.5s normal ease-in-out;
`;

export default MBTISelection;
