import "styled-components";
import {
  FontSizeTypes,
  FontWeightTypes,
  LineHeightTypes,
  PaletteTypes,
  TextStyleTypes,
} from "./styles/theme";

declare module "styled-components" {
  export interface DefaultTheme {
    palette: PaletteTypes;
    textStyle: TextStyleTypes;
    fontSize: FontSizeTypes;
    fontWeight: FontWeightTypes;
    lineHeight: LineHeightTypes;
  }
}
