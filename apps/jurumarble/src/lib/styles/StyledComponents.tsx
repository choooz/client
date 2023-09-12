"use client";

import StyledComponentsRegistry from "lib/registory";
import { PropsWithChildren } from "react";
import { ThemeProvider } from "styled-components";
import { jurumarbleTheme } from "./theme";
import GlobalStyles from "./globalStyles";
import { theme } from "@monorepo/ui";

function StyledComponents({ children }: PropsWithChildren) {
  return (
    <StyledComponentsRegistry>
      <ThemeProvider theme={{ ...jurumarbleTheme, ...theme }}>
        <GlobalStyles />
        {children}
      </ThemeProvider>
    </StyledComponentsRegistry>
  );
}

export default StyledComponents;
