import React from "react";
import styled, { css } from "styled-components";

interface ButtonStyledProps {
  /**
   * 버튼 타입
   */
  variant?: "primary" | "outline";
  /**
   * 버튼 가로 길이
   */
  width?: `${number}px` | `${number}%`;
  /**
   * 버튼 세로 길이
   */
  height?: `${number}px` | `${number}%`;
  /**
   * 버튼 둥글기
   */
  borderRadius?: string;
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, ButtonStyledProps {
  children: React.ReactNode;
}

function Button({ width, height, variant, borderRadius = "10px", children, ...rest }: ButtonProps) {
  return (
    <ButtonStyled
      variant={variant}
      width={width}
      height={height}
      borderRadius={borderRadius}
      {...rest}
    >
      {children}
    </ButtonStyled>
  );
}

const variantStyles = {
  primary: css`
    ${({ theme }) => css`
      background-color: ${theme.colors.main_01};
      color: ${theme.colors.white};
    `}
  `,
  outline: css`
    ${({ theme }) => css`
      border: 1px solid ${theme.colors.black_05};
      color: ${theme.colors.black_03};
    `}
  `,
};

const ButtonStyled = styled.button<ButtonStyledProps>`
  ${({ theme, width, height, borderRadius, variant }) => css`
    width: ${width};
    height: ${height};
    border-radius: ${borderRadius};
    ${variant && variantStyles[variant]};
    display: inline-flex;
    justify-content: center;
    align-items: center;
    padding: 0;
    border: none;
    cursor: pointer;
  `}
`;

export default Button;
