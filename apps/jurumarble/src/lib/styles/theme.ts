// import { DefaultTheme, Colors } from "styled-components";
import { DefaultTheme } from "styled-components";

const colors = {
  black_01: "#222222",
  black_02: "#373737",
  black_03: "#676767",
  black_04: "#898989",
  black_05: "#cccccc",
  white: "#ffffff",
  bg_01: "#f0f0f0",
  bg_02: "#f5f5f5",
  line_01: "#e9e9e9",
  line_02: "#f5f5f5",
  main_01: "#ff4a16",
  main_02: "#ffe8e1",
  sub_01: "#ffa183",
  sub_02: "#aedac4",
  system_red: "#dc0000",
  system_green: "#04b014",
  system_yellow: "#f5a623",
  system_blue: "rgba(0, 26, 255, 0.80)",
  system_black: "rgba(0, 0, 0, 0.80)",
  modal: "rgba(0, 0, 0, 0.5)",
  main_drop_shadow_top: "rgba(235, 235, 235, 0.80)",
  main_drop_shadow_bottom: "rgba(235, 235, 235, 0.80)",
  modal_shadow: "rgba(235, 235, 235, 0.80)",
  kakao: "#fee500",
  naver: "#03c75a",
} as const;

const typography = {
  headline01: `
    font-size: 24px; 
    font-weight: 700; 
    line-height: 32px; 
    letter-spacing: -0.24px; 
    `,
  headline02: `
    font-size: 20px;
    font-weight: 700;
    line-height: 28px;
    letter-spacing: -0.2px;
    `,
  headline03: `
    font-size: 18px;
    font-weight: 600;
    line-height: 24px;
    letter-spacing: -0.18px;
    `,
  headline04: `
    font-size: 16px;
    font-weight: 700;
    line-height: 22px;
    letter-spacing: -0.16px;
    `,
  subhead01: `
    font-size: 18px;
    font-weight: 400;
    line-height: 24px;
    letter-spacing: -0.18px;
    `,
  subhead02: `
    font-size: 14px;
    font-weight: 400;
    line-height: 18px;
    letter-spacing: -0.14px;
    `,
  body01: `
    font-size: 16px;
    font-weight: 700;
    line-height: 22px;
    letter-spacing: -0.16px;
    `,
  body_long01: `
    font-size: 16px;
    font-weight: 700;
    line-height: 24px;
    letter-spacing: -0.16px;
    `,
  body02: `
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
    `,
  body03: `
    font-size: 14px;
    font-weight: 400;
    line-height: 18px;
    `,
  body_long03: `
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
    `,
  body04: `
    font-size: 14px;
    font-weight: 700;
    line-height: 18px;
    `,
  caption_chip: `
    font-size: 12px;
    font-weight: 600;
    line-height: 14px;
    `,
  navigation: `
    font-size: 10px;
    font-weight: 500;
    line-height: 14px; 
    `,
  button01: `
  font-size: 14px;
  font-weight: 600;
  line-height: 18px; 
  `,
  button02: `
  font-size: 14px;
  font-weight: 400;
  line-height: 18px; 
  `,
} as const;

const mediaQuery = (minWidth: number) => `@media (min-width: ${minWidth}px)`;

const mediaSize = {
  xxlarge: 1920,
  xlarge: 1366,
  large: 1024,
  medium: 720,
  small: 414,
  xsmall: 320,
} as const;

const { xxlarge, xlarge, large, medium, small, xsmall } = mediaSize;

const media = {
  xxlarge: mediaQuery(xxlarge),
  xlarge: mediaQuery(xlarge),
  large: mediaQuery(large),
  medium: mediaQuery(medium),
  small: mediaQuery(small),
  xsmall: mediaQuery(xsmall),
} as const;

export type ThemeColors = typeof colors;
export type ThemeTypography = typeof typography;
export type ThemeMedia = typeof media;

export const jurumarbleTheme = {
  colors,
  typography,
  media,
};
