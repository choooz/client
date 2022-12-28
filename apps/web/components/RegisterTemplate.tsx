import React from "react";
import styled from "styled-components";
import { media } from "styles/media";
import { palette } from "styles/palette";
import transitions from "styles/transitions";

interface Props {
  welcomeText: React.ReactNode;
  questionText: React.ReactNode;
  buttonBox: React.ReactNode;
  children: React.ReactNode;
}

const RegisterTemplate = ({ welcomeText, buttonBox, questionText, children }: Props) => {
  return (
    <>
      <WelcomeText>{welcomeText}</WelcomeText>
      <QuestionText>
        {questionText}
        <BlinkText>_</BlinkText>
      </QuestionText>
      <VoteBox>{children}</VoteBox>
      <ButtonWrapper>{buttonBox}</ButtonWrapper>
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
  display: flex;
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

const ButtonWrapper = styled.div`
  display: flex;
  position: absolute;
  bottom: 30px;
  width: 100%;
  padding: 0 30px;
  left: 50%;
  transform: translateX(-50%);
`;

const BlinkText = styled.div`
  animation: ${transitions.blink} 1s step-end infinite;
`;

export default RegisterTemplate;
