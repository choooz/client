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
  modal: "rgba(0, 0, 0, 0.5)",
} as const;

const typography = {
  headline01: `
    font-size: 24px; 
    font-style: normal; 
    font-weight: 700; 
    line-height: 130%; 
    letter-spacing: -0.24px; 
    `,
  headline02: `
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: 130%;
    letter-spacing: -0.2px;
    `,
  headline03: `
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: 130%;
    letter-spacing: -0.18px;
    `,
  headline04: `
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: 130%;
    letter-spacing: -0.16px;
    `,
  subhead01: `
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: 130%;
    letter-spacing: -0.18px;
    `,
  subhead02: `
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 130%;
    letter-spacing: -0.14px;
    `,
  body01: `
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: 130%;
    letter-spacing: -0.16px;
    `,
  body_long01: `
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: 150%;
    letter-spacing: -0.16px;
    `,
  body02: `
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 130%
    letter-spacing: -0.16px;
    `,
  body03: `
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 130%;
    letter-spacing: -0.14px;
    `,
  body_long03: `
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%;
    letter-spacing: -0.14px;
    `,
  caption: `
    font-size: 12px;
    font-style: normal;
    font-weight: 600;
    line-height: 130%;
    `,
  chip: `
    font-size: 12px;
    font-style: normal;
    font-weight: 600;
    line-height: 100%;
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

export const jurumarbleTheme: DefaultTheme = {
  colors,
  typography,
  media,
};
