import { Eyes } from "assets";
import RegisterTemplate from "components/RegisterTemplate";
import Image from "next/image";
import { MBTIType } from "pages/login";
import React, { MouseEvent } from "react";
import styled, { css } from "styled-components";
import { media } from "styles/media";
import { palette } from "styles/palette";
import transitions from "styles/transitions";

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
        <LeftVote selected={MBTI.M === "E"} onClick={onChangeMBTI} name="M" value="E">
          <div>E</div>
          <VoteText>외향형</VoteText>
        </LeftVote>
        <RightVote selected={MBTI.M === "I"} onClick={onChangeMBTI} name="M" value="I">
          <div>I</div>
          <VoteText>내향형</VoteText>
        </RightVote>
      </VoteBox>
      <VoteBox>
        <LeftVote selected={MBTI.B === "S"} onClick={onChangeMBTI} name="B" value="S">
          <div>S</div>
          <VoteText>감정형</VoteText>
        </LeftVote>
        <RightVote selected={MBTI.B === "N"} onClick={onChangeMBTI} name="B" value="N">
          <div>N</div>
          <VoteText>직관형</VoteText>
        </RightVote>
      </VoteBox>
      <VoteBox>
        <LeftVote selected={MBTI.T === "T"} onClick={onChangeMBTI} name="T" value="T">
          <div>T</div>
          <VoteText>사고형</VoteText>
        </LeftVote>
        <RightVote selected={MBTI.T === "F"} onClick={onChangeMBTI} name="T" value="F">
          <div>F</div>
          <VoteText>감정형</VoteText>
        </RightVote>
      </VoteBox>
      <VoteBox>
        <LeftVote selected={MBTI.I === "J"} onClick={onChangeMBTI} name="I" value="J">
          <div>J</div>
          <VoteText>판단형</VoteText>
        </LeftVote>
        <RightVote selected={MBTI.I === "P"} onClick={onChangeMBTI} name="I" value="P">
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
