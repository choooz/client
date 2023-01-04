import styled from "styled-components";
import { theme, transitions } from "../styles";
import { media } from "../styles/media";

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

const RegisterTemplate = ({
  welcomeText,
  children,
  search,
  question = "",
  nextButtonProps,
  prevButtonProps,
  nextButtonText,
  prevButtonText,
}: Props) => {
  let result = question;
  if (search) {
    result = question.replace(new RegExp(search, "gi"), (match) => {
      return match && `<mark>${match}</mark>`;
    });
  }

  return (
    <>
      <WelcomeText>{welcomeText}</WelcomeText>
      <QuestionText>
        <StyleText dangerouslySetInnerHTML={{ __html: result }} />
        <BlinkText>_</BlinkText>
      </QuestionText>
      <VoteBox>{children}</VoteBox>
      <ButtonWrapper>
        {prevButtonText && <Back {...prevButtonProps}>{prevButtonText}</Back>}
        {nextButtonText && <Button {...nextButtonProps}>{nextButtonText}</Button>}
      </ButtonWrapper>
    </>
  );
};

const WelcomeText = styled.div`
  display: flex;
  font-size: 18px;
  font-weight: 700;
  color: ${theme.palette.ink.light};
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

const ButtonWrapper = styled.div`
  display: flex;
  position: absolute;
  bottom: 30px;
  width: 100%;
  padding: 0 30px;
  left: 50%;
  transform: translateX(-50%);
  button:first-child:nth-last-child(1) {
    width: 100%;
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

const Back = styled.button`
  font-size: 16px;
  font-weight: 700;
  color: ${({ theme }) => theme.palette.ink.lightest};
  height: 56px;
  width: 24%;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${transitions.delaypopInFromBottom} 1.5s normal ease-in-out;
`;

const Button = styled.button`
  width: 76%;
  height: 56px;
  background-color: ${({ theme }) => theme.palette.point.purple};
  color: white;
  border-radius: 4px;
  animation: ${transitions.delaypopInFromBottom} 1.5s normal ease-in-out;
  font-weight: 700;
  transition: all 0.3s ease-in-out;
  :disabled {
    background-color: ${({ theme }) => theme.palette.border.base};
    color: ${({ theme }) => theme.palette.ink.lightest};
  }
`;

export default RegisterTemplate;
