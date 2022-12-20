import type { AppProps } from "next/app";
import styled from "styled-components";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import GlobalStyle from "../styles/globalStyles";

export default function App({ Component, pageProps }: AppProps) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <GlobalStyle />
      <Applayout>
        <Component {...pageProps} />
      </Applayout>
    </QueryClientProvider>
  );
}

const Applayout = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;
