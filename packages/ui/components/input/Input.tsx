import React from "react";
import styled, { css } from "styled-components";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /**
   * Input 형태
   */
  variant?: "standard" | "outlined";
  /**
   * Input 가로 길이
   */
  width: `${number}px` | `${number}%` | "auto";
  /**
   * 포커스 여뿌
   * 기본 값 : false
   */
  autoFocus?: boolean;
}

function Input({ width, height, variant, ...rest }: InputProps) {
  return <InputStyled type="text" width={width} height={height} variant={variant} {...rest} />;
}

const variantStyles = {
  standard: css`
    border-bottom: 1px solid ${({ theme }) => theme.palette.border.base};
    padding: 4px;
    ::placeholder {
      color: ${({ theme }) => theme.palette.ink.lighter};
    }
  `,
  outlined: css`
    height: 46px;
    border: 1px solid ${({ theme }) => theme.palette.border.light};
    border-radius: 4px;
    padding: 4px 8px;
    ::placeholder {
      color: ${({ theme }) => theme.palette.ink.lighter};
    }
  `,
};

const InputStyled = styled.input<InputProps>`
  color: ${({ theme }) => theme.palette.ink.dark};
  width: ${({ width }) => width};
  ${({ variant }) => variantStyles[variant || "standard"]}
`;

export default Input;
