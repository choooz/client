import React from "react";
import styled from "styled-components";
import { transitions } from "../../styles";
import Button from "../button/Button";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

interface Props {
  children: React.ReactNode;
  nextButtonText?: string;
  prevButtonText?: string;
  nextButtonProps?: ButtonProps;
  prevButtonProps?: ButtonProps;
}

function Template({
  children,
  prevButtonText,
  prevButtonProps,
  nextButtonProps,
  nextButtonText,
}: Props) {
  return (
    <>
      {children}
      <ButtonWrapper>
        {prevButtonText && (
          <BackButton variant="inactive" width="24%" height="56px" {...prevButtonProps}>
            {prevButtonText}
          </BackButton>
        )}
        {nextButtonText && (
          <NextButton variant="primary" width="76%" height="56px" {...nextButtonProps}>
            {nextButtonText}
          </NextButton>
        )}
      </ButtonWrapper>
    </>
  );
}

const BackButton = styled(Button)`
  background-color: ${({ theme }) => theme.palette.background.white};
  animation: ${transitions.delaypopInFromBottom} 1.5s normal ease-in-out;
`;

const NextButton = styled(Button)`
  animation: ${transitions.delaypopInFromBottom} 1.5s normal ease-in-out;
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

export default Template;
