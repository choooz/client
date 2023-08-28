"use client";

import StyledComponentsRegistry from "lib/registory";
import { PropsWithChildren } from "react";
import { StyleSheetManager, ThemeProvider } from "styled-components";
import { jurumarbleTheme } from "./theme";
import isPropValid from "@emotion/is-prop-valid";
import GlobalStyles from "./globalStyles";

function StyledComponents({ children }: PropsWithChildren) {
  return (
    <StyledComponentsRegistry>
      {/*
         @NOTE : 참고 https://styled-components.com/docs/api#stylesheetmanagers
         porps를 전달할 때 isPropValid를 사용하여 styled-components에서 지원하지 않는 props를 제거한다.
      */}
      {/* <StyleSheetManager
        shouldForwardProp={(propName, elementToBeRendered) => {
          return typeof elementToBeRendered === "string" ? isPropValid(propName) : true;
        }}
      > */}
      <ThemeProvider theme={jurumarbleTheme}>
        <>
          <GlobalStyles />
          {children}
        </>
      </ThemeProvider>
      {/* </StyleSheetManager> */}
    </StyledComponentsRegistry>
  );
}

export default StyledComponents;
