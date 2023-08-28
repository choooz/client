import React from "react";
import styled, { css } from "styled-components";

interface ButtonStyledProps {
  /**
   * 버튼 타입
   */
  variant?: "primary" | "inactive" | "outline" | "warning";
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

function Button({ width, height, variant, borderRadius = "4px", children, ...rest }: ButtonProps) {
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

const ButtonStyled = styled.button<ButtonStyledProps>`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  border-radius: ${({ borderRadius }) => borderRadius};
  font-weight: 700;
`;

export default Button;
