import "styled-components";
import { ThemeColors, ThemeMedia, ThemeTypography } from "../lib/styles/theme";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: ThemeColors;
    typography: ThemeTypography;
    media: ThemeMedia;
  }
}
