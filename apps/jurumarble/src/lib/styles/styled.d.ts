import { theme } from "@monorepo/ui";

import { ThemeColors, ThemeMedia, ThemeTypography } from "./theme";

type Theme = typeof theme;
declare module "styled-components" {
  export interface DefaultTheme extends Theme {
    colors: ThemeColors;
    typography: ThemeTypography;
    media: ThemeMedia;
  }
}
