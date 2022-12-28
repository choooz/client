import { Colors, FontSizes, Media } from "libs/style/theme/defaultTheme";
import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    palette: PaletteTypes;
    textStyle: TextStyleTypes;
    fontSize: FontSizeTypes;
    fontWeight: FontWeightTypes;
    lineHeight: LineHeightTypes;
  }
}
