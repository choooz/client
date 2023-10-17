"use client";
import React, { forwardRef } from "react";

import styled from "styled-components";

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

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ width, height, variant, ...rest }, ref) => {
    return (
      <InputStyled
        ref={ref}
        type="text"
        width={width}
        height={height}
        variant={variant}
        {...rest}
      />
    );
  },
);

const InputStyled = styled.input<InputProps>`
  color: ${({ theme }) => theme.colors.black_01};
  width: ${({ width }) => width};
  border: none;
`;

export default Input;
