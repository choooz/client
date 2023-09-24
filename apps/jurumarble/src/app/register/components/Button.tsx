"use client";

import { ReactNode } from "react";
import styled, { css } from "styled-components";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  fullWidth?: boolean;
  disabled?: boolean;
  children: ReactNode;
}

export const Button = ({ className, fullWidth, children, disabled, ...rest }: ButtonProps) => {
  return (
    <StyledButton className={className} disabled={disabled} $fullWidth={fullWidth} {...rest}>
      {children}
    </StyledButton>
  );
};

const StyledButton = styled.button<{
  $fullWidth?: boolean;
  disabled?: boolean;
}>`
  border-radius: 10px;
  font-size: 16px;
  font-weight: 700;
  line-height: 21px;
  padding: 17px 20px;
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.main_01};

  ${({ disabled }) =>
    disabled &&
    css`
      color: ${({ theme }) => theme.colors.black_03};
      background: ${({ theme }) => theme.colors.black_05};
    `};

  ${({ $fullWidth }) =>
    $fullWidth &&
    css`
      width: 100%;
    `};
`;
