import StyledLayout from "components/StyledLayout";
import { pretandard } from "lib/localFont";
import ReactQueryProvider from "lib/ReactQueryProvider";
import StyledComponents from "lib/styles/StyledComponents";
import type { Metadata } from "next";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { injectStyle } from "react-toastify/dist/inject-style";
import { KAKAO_MAP_API_KEY } from "lib/constants";
import Script from "next/script";

export const metadata: Metadata = {
  title: "주루마블",
  description: "주루마블",
};

if (typeof window !== "undefined") {
  injectStyle();
}

declare global {
  interface Window {
    kakao: any;
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="kr">
      <head></head>
      <body className={pretandard.className} suppressHydrationWarning={true}>
        <ReactQueryProvider>
          <StyledComponents>
            <StyledLayout>
              <>
                <div id="portal" />
                {children}
                <ToastContainer position="top-center" autoClose={2000} hideProgressBar />
              </>
            </StyledLayout>
          </StyledComponents>
        </ReactQueryProvider>
      </body>
      <Script src="https://developers.kakao.com/sdk/js/kakao.js" async />
      <Script
        type="text/javascript"
        src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_MAP_API_KEY}&libraries=services&autoload=false`}
      ></Script>
    </html>
  );
}
