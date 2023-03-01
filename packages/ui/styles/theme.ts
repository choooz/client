import { DefaultTheme } from "styled-components";

const palette = {
  ink: {
    lightest: "#ffffff",
    lighter: "#e5e5ec",
    light: "#999999",
    base: "#767676",
    dark: "#505050",
    darker: "#111111",
  },
  main: {
    point: "#874CE4",
    sub: "#190665",
    opacitySub: "rgba(25, 6, 101, 0.6)",
  },
  border: {
    light: "#F6F3F0",
    base: "#E5E5EC",
    dark: "#111111",
  },
  background: {
    white: "#ffffff",
    soft: "#F7F7FB",
    hard: "#F1F1F5",
    selected: "#C5C0FF",
    selectedSoft: "#DCD9FF",
    inactive: "#E5E5EC",
    myPage: "#343434",
    black: "#111111",
  },
  system: {
    danger: "#dc0035",
    success: "#114b9a",
  },
  social: {
    facebook: "#3b5998",
    twitter: "#1da1f2",
    google: "#db4437",
    kakao: "#FEE500",
    naver: "#03C75A",
  },
} as const;

const fontSize = {
  xxSmall: "12px",
  xSmall: "14px",
  small: "16px",
  medium: "18px",
  large: "20px",
  xLarge: "24px",
  xxLarge: "28px",
  xxxLarge: "32px",
} as const;

const fontWeight = {
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extraBold: 800,
} as const;

const lineHeight = {
  xxSmall: "16px",
  xSmall: "18px",
  small: "22px",
  medium: "24px",
  large: "26px",
  xLarge: "32px",
  xxLarge: "36px",
  xxxLarge: "40px",
} as const;

// @Note font-weight, bold가 어떻게 사용될 지 몰라 일단 안 넣었음 많이 사용될 것 같으면 코드에 추가하여 사용할 것
const textStyle = {
  Title_1: `
    font-size: ${fontSize.xxxLarge};
    line-height: ${lineHeight.xxxLarge};
  `,
  Title_2: `
    font-size: ${fontSize.xxLarge};
    line-height: ${lineHeight.xxLarge};
  `,
  Title_3: `
    font-size: ${fontSize.xLarge};
    line-height: ${lineHeight.xLarge};
  `,
  Title_Large: `
    font-size: ${fontSize.large};
    line-height: ${lineHeight.large};
  `,
  Title_Medium: `
    font-size: ${fontSize.medium};
    line-height: ${lineHeight.medium};
  `,
  Title_Small: `
    font-size: ${fontSize.small};
    line-height: ${lineHeight.small};
  `,
  Font_Regular: `
    font-size: ${fontSize.xSmall};
    line-height: ${lineHeight.xSmall};
  `,
  Font_Minimum: `
    font-size: ${fontSize.xxSmall};
    line-height: ${lineHeight.xxSmall};
  `,
} as const;

export type PaletteTypes = typeof palette;
export type PaletteKeyTypes = keyof typeof palette;
export type TextStyleTypes = typeof textStyle;
export type FontSizeTypes = typeof fontSize;
export type FontWeightTypes = typeof fontWeight;
export type LineHeightTypes = typeof lineHeight;

const theme: DefaultTheme = {
  palette,
  textStyle,
  fontSize,
  fontWeight,
  lineHeight,
};

export default theme;
