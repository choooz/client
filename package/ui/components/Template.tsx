import React from "react";
import styled from "styled-components";
import { transitions } from "../styles";

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
        {prevButtonText && <Back {...prevButtonProps}>{prevButtonText}</Back>}
        {nextButtonText && <Button {...nextButtonProps}>{nextButtonText}</Button>}
      </ButtonWrapper>
    </>
  );
}

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
