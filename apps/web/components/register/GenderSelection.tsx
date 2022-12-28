import styled, { css } from "styled-components";
import React from "react";
import Image from "next/image";
import { CheckRound, Female, Male, PurpleMonster } from "assets";
import { palette } from "styles/palette";
import transitions from "styles/transitions";
import { media } from "styles/media";

interface Props {
  gender: "female" | "male" | "";
  onChangeSelectMale(): void;
  onChangeSelectFemale(): void;
  onAddProgress(number: number): void;
}

const GenderSelection = ({
  gender,
  onChangeSelectMale,
  onChangeSelectFemale,
  onAddProgress,
}: Props) => {
  return (
    <>
      <WelcomeText>
        <Image src={PurpleMonster} alt="캐릭터" width={30} />
        반가워요!
      </WelcomeText>
      <QuestionText>Lv.1 당신의 성별은?_</QuestionText>
      <VoteBox>
        <LeftVote selected={gender === "male"} onClick={onChangeSelectMale}>
          <ImageWrapper>
            <Image src={Male} alt="남성" height={100} />
          </ImageWrapper>
          {gender === "male" ? (
            <VoteText>
              <Image src={CheckRound} alt="선택" width={16} />
              남성으로 Chooz!
            </VoteText>
          ) : (
            "남성"
          )}
        </LeftVote>
        <RightVote selected={gender === "female"} onClick={onChangeSelectFemale}>
          <ImageWrapper>
            <Image src={Female} alt="여성" height={100} />
          </ImageWrapper>
          {gender === "female" ? (
            <VoteText>
              <Image src={CheckRound} alt="선택" width={16} />
              여성으로 Chooz!
            </VoteText>
          ) : (
            "여성"
          )}
        </RightVote>
      </VoteBox>
      선택된 값: {gender}
      <ButtonWrapper>
        <Button onClick={() => onAddProgress(1)} disabled={gender.length < 1}>
          다음
        </Button>
      </ButtonWrapper>
    </>
  );
};

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
  height: 265px;
  ${media.medium} {
    height: 348px;
  }
`;
const LeftVote = styled.div<{ selected: boolean }>`
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
  font-size: 18px;
  transition: all 0.3s ease-in-out;
  ${({ selected }) =>
    selected
      ? css`
          width: 91%;
          border: 1px solid #863dff;
          background-color: rgba(140, 130, 255, 50%);
          font-size: 16px;
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
  display: flex;
  gap: 4px;
  align-items: center;
`;

const ImageWrapper = styled.div`
  flex: 0.8;
  display: flex;
  align-items: center;
`;

const ButtonWrapper = styled.div`
  position: absolute;
  bottom: 30px;
  width: 100%;
  padding: 0 30px;
  left: 50%;
  transform: translateX(-50%);
`;

const Button = styled.button`
  width: 100%;
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

export default GenderSelection;
