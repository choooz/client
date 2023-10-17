import { pretandard } from "lib/localFont";
import ReactQueryProvider from "lib/ReactQueryProvider";
import StyledComponents from "lib/styles/StyledComponents";
import type { Metadata } from "next";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { injectStyle } from "react-toastify/dist/inject-style";
import AuthProcess from "components/AuthProcess";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { PageLayout } from "components/layouts";
import "lib/styles/global.css";

export const metadata: Metadata = {
  title: "주루마블",
  description: "주루마블",
};

if (typeof window !== "undefined") {
  injectStyle();
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="kr">
      <head></head>
      <body className={pretandard.className} suppressHydrationWarning={true}>
        <ReactQueryProvider>
          <StyledComponents>
            <PageLayout>
              <div id="portal" />
              <AuthProcess />
              {children}
              <ToastContainer position="top-center" autoClose={2000} hideProgressBar />
            </PageLayout>
          </StyledComponents>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
