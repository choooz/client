"use client";

import { theme } from "@chooz/ui";
import styled, { ThemeProvider } from "styled-components";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { GlobalStyles } from "styles/globalStyles";
import Header from "components/common/Header";
import StyledComponentsRegistry from "../lib/registry";

function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient();

  // Remove the server-side injected CSS.
  // 추후 콘솔에서 Warning 발생 안할시 제거
  if (document.body.getAttribute("style") === "") {
    document.body.removeAttribute("style");
  }

  return (
    <html lang="kr">
      {/* Head font */}
      <body>
        <div id="portal" />
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools />
          <ThemeProvider theme={theme}>
            <GlobalStyles />
            <div id="stars" />
            <div id="stars2" />
            <div id="stars3" />
            <Applayout>
              {/* // @todo header 넣는 다른 방법이 있을 것 layout? */}
              <Header />
              <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
            </Applayout>
          </ThemeProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}

const Applayout = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding: 0 16px;
  flex: 1;
`;

export default RootLayout;
