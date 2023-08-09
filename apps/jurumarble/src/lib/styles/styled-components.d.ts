import "styled-components";
import { ThemeColors, ThemeTypography } from "./theme";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: ThemeColors;
    typography: ThemeTypography;
  }
}
