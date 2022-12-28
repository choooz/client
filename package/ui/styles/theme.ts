import type { DefaultTheme } from "styled-components";
import { css } from "styled-components";

const palette = {
  point_color: {
    point_color_1: "#ffbd3e",
    point_color_2: "#ff7549",
    point_color_3: "#874ce4",
  },
  // @note 필요시 코드 설정할 것
  ink: {
    lighter: "#72777A",
    light: "#767676",
    base: "#404446",
    dark: "#303437",
    darker: "#202325",
    darkest: "#090A0A",
  },
  background_color: {
    light: "#fbf8f7",
    base: "white",
    dark: "#f5f3f1",
  },
  system_color: {
    // @note 금지, 실패, 위험 등
    red: "#dc0035",
    // @note 성공, 진행, 안전 등
    blue: "#114b9a",
  },
  border_color: {
    light: "#f6f3f0",
    base: "#ece8e5",
    dark: "#111111",
  },
  social_color: {
    facebook: "#3b5998",
    twitter: "#1da1f2",
    google: "#db4437",
    kakao: "#FEE500",
    naver: "#03C75A",
  },
  ui_color: {
    progressBar: "#c4befd",
  },
};

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
  regular: {
    Title_1: css`
      font-size: ${fontSize.xxxLarge};
      line-height: ${lineHeight.xxxLarge};
    `,
    Title_2: css`
      font-size: ${fontSize.xxLarge};
      line-height: ${lineHeight.xxLarge};
    `,
    Title_3: css`
      font-size: ${fontSize.xLarge};
      line-height: ${lineHeight.xLarge};
    `,
    Title_Large: css`
      font-size: ${fontSize.large};
      line-height: ${lineHeight.large};
    `,
    Title_Medium: css`
      font-size: ${fontSize.medium};
      line-height: ${lineHeight.medium};
    `,
    Title_Small: css`
      font-size: ${fontSize.small};
      line-height: ${lineHeight.small};
    `,
    Font_Regular: css`
      font-size: ${fontSize.xSmall};
      line-height: ${lineHeight.xSmall};
    `,
    Font_Minimum: css`
      font-size: ${fontSize.xxSmall};
      line-height: ${lineHeight.xxSmall};
    `,
  },
  bold: {},
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
