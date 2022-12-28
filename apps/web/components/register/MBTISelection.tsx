import { transitions } from "@chooz/ui";
import { Eyes } from "assets/images";
import Image from "next/image";
import type { MBTIType } from "pages/register";
import type { MouseEvent } from "react";
import styled, { css } from "styled-components";
import { palette } from "styles/palette";
interface Props {
  MBTI: MBTIType;
  onChangeMBTI(e: MouseEvent<HTMLButtonElement>): void;
  onAddProgress(number: number): void;
}

function MBTISelection({ MBTI, onChangeMBTI, onAddProgress }: Props) {
  return (
    <>
      <WelcomeText>
        <Image alt="캐릭터" src={Eyes} width={30} />
        어떤 사람인가요?
      </WelcomeText>
      <QuestionText>
        Lv.1 당신의 <StrongText>MBTI</StrongText>는?_
      </QuestionText>
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
      <ButtonWrapper>
        {/* MBTI에 빈값이 있으면 disabled */}
        <Back onClick={() => onAddProgress(-1)}>이전</Back>
        <Button disabled={Object.values(MBTI).includes("")} onClick={() => onAddProgress(1)}>
          다음
        </Button>
      </ButtonWrapper>
    </>
  );
}

const WelcomeText = styled.div`
  display: flex;
  font-size: 18px;
  font-weight: 700;
  color: ${palette.ink.light};
  gap: 6px;
  line-height: 26px;
  padding-bottom: 24px;
  animation: ${transitions.popInFromBottom} 0.7s ease-in-out;
`;

const QuestionText = styled.div`
  font-size: 28px;
  font-weight: 400;
  font-family: NeoDunggeunmo, Pretendard Variable, -apple-system, BlinkMacSystemFont, system-ui,
    Roboto, "Helvetica Neue";
  padding-bottom: 40px;
  animation: ${transitions.delaypopInFromBottom} 0.9s ease-in-out;
`;

const VoteBox = styled.div`
  position: relative;
  width: 100%;
  animation: ${transitions.delaypopInFromBottom} 1.3s normal ease-in-out;
  height: 56px;
  margin: 7px 0;
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
  ${({ selected }) =>
    selected
      ? css`
          width: 265px;
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

const ButtonWrapper = styled.div`
  display: flex;
  position: absolute;
  bottom: 30px;
  width: 100%;
  padding: 0 30px;
  left: 50%;
  transform: translateX(-50%);
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
