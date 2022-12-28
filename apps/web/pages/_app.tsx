import { theme } from "@chooz/ui";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { AppProps } from "next/app";
import styled, { ThemeProvider } from "styled-components";
import { GlobalStyles } from "styles/globalStyles";

import Header from "../components/header/Header";

function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <div id="stars" />
        <div id="stars2" />
        <div id="stars3" />
        <Applayout>
          <Header />
          <Component {...pageProps} />
        </Applayout>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

const Applayout = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  padding: 0 16px;
  flex: 1;
`;

export default App;
