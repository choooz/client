import { ThemeColors, ThemeMedia, ThemeTypography } from "./theme";
import { theme } from "@monorepo/ui";

type Theme = typeof theme;
declare module "styled-components" {
  export interface DefaultTheme extends Theme {
    colors: ThemeColors;
    typography: ThemeTypography;
    media: ThemeMedia;
  }
}
