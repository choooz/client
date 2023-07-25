"use client";

import { theme } from "@chooz/ui";
import styled, { ThemeProvider } from "styled-components";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { GlobalStyles } from "styles/globalStyles";
import StyledComponentsRegistry from "../lib/registry";
import useReplaceUser from "hooks/useReplaceUser";
import Header from "components/common/header/Header";
import { media } from "styles/media";

function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60 * 60 * 24,
        cacheTime: 1000 * 60 * 60 * 24,
      },
    },
  });

  useReplaceUser();

  return (
    <html lang="kr">
      <head></head>
      <body>
        <div id="portal" />
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools />
          <StyledComponentsRegistry>
            <ThemeProvider theme={theme}>
              <GlobalStyles />
              <Header />
              <Applayout>
                <Stars>
                  <div id="stars" />
                  <div id="stars2" />
                  <div id="stars3" />
                </Stars>
                {children}
              </Applayout>
            </ThemeProvider>
          </StyledComponentsRegistry>
        </QueryClientProvider>
      </body>
    </html>
  );
}

const Applayout = styled.div`
  display: flex;
  flex-direction: column;
  padding: 13px 16px 0;
  flex: 1;
  overflow: hidden;
  height: calc(100svh - 55px);
  ${media.medium} {
    padding-top: 34px;
  }
`;

const Stars = styled.div`
  height: 6px;
`;

export default RootLayout;
