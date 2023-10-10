import React, { InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import styled, { css } from "styled-components";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  /**
   * Input 형태
   */
  variant?: "standard" | "outlined";
  /**
   * Input 가로 길이
   */
  width: `${number}px` | `${number}%` | "auto";
  /**
   * Input 가로 길이
   */
  height: `${number}px` | `${number}%` | "auto";
  /**
   * 포커스 여부
   * 기본 값 : false
   */
  autoFocus?: boolean;
}

function Textarea({ width, height, variant, ...rest }: TextareaProps) {
  return <TextareaStyled width={width} height={height} {...rest} />;
}

const TextareaStyled = styled.textarea<TextareaProps>`
  ${({ theme, width, height }) =>
    css`
    color: ${theme.colors.black_01}
    width: ${width};
    height: ${height};
    border: none;
    `}
`;

export default Textarea;
