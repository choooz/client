"use client";

import StyledComponentsRegistry from "lib/registory";
import { PropsWithChildren } from "react";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./globalStyles";
import { jurumarbleTheme } from "./theme";

function StyledComponents({ children }: PropsWithChildren) {
  return (
    <StyledComponentsRegistry>
      <ThemeProvider theme={jurumarbleTheme}>
        <GlobalStyles />
        {children}
      </ThemeProvider>
    </StyledComponentsRegistry>
  );
}

export default StyledComponents;
