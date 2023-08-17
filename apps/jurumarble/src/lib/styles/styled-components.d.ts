import "styled-components";
import { ThemeColors, ThemeMedia, ThemeTypography } from "./theme";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: ThemeColors;
    typography: ThemeTypography;
    media: ThemeMedia;
  }
}
