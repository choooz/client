import styled from "styled-components";
import { theme, transitions } from "../../styles";
import { media } from "../../styles/media";
import Template from "./Template";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

interface Props {
  welcomeText?: React.ReactNode;
  children: React.ReactNode;
  search?: string;
  question?: string;
  nextButtonText?: string;
  prevButtonText?: string;
  nextButtonProps?: ButtonProps;
  prevButtonProps?: ButtonProps;
}

function RegisterTemplate({
  welcomeText,
  children,
  search,
  question = "",
  nextButtonProps,
  prevButtonProps,
  nextButtonText,
  prevButtonText,
}: Props) {
  let result = question;
  if (search) {
    result = question.replace(new RegExp(search, "gi"), (match) => {
      return match && `<mark>${match}</mark>`;
    });
  }

  return (
    <Template
      nextButtonProps={nextButtonProps}
      nextButtonText={nextButtonText}
      prevButtonProps={prevButtonProps}
      prevButtonText={prevButtonText}
    >
      <WelcomeText>{welcomeText}</WelcomeText>
      <QuestionText>
        <StyleText dangerouslySetInnerHTML={{ __html: result }} />
        <BlinkText>_</BlinkText>
      </QuestionText>
      <VoteBox>{children}</VoteBox>
    </Template>
  );
}

const WelcomeText = styled.div`
  display: flex;
  font-size: 18px;
  font-weight: 700;
  color: ${theme.palette.ink.lighter};
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
  padding-bottom: 32px;
  animation: ${transitions.delaypopInFromBottom} 0.9s ease-in-out;
  ${media.medium} {
    padding-bottom: 40px;
  }
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

const BlinkText = styled.div`
  animation: ${transitions.blink} 1s step-end infinite;
`;

const StyleText = styled.div`
  display: flex;
  font-size: 28px;
  font-weight: 400;
  font-family: NeoDunggeunmo, Pretendard Variable, -apple-system, BlinkMacSystemFont, system-ui,
    Roboto, "Helvetica Neue";
  padding-bottom: 32px;
  animation: ${transitions.delaypopInFromBottom} 0.9s ease-in-out;
  ${media.medium} {
    padding-bottom: 40px;
  }
  mark {
    color: #6f4ef5;
  }
`;

export default RegisterTemplate;
