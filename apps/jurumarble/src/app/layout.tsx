import StyledLayout from "components/StyledLayout";
import { pretandard } from "lib/localFont";
import ReactQueryProvider from "lib/ReactQueryProvider";
import StyledComponents from "lib/styles/StyledComponents";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "주루마블",
  description: "주루마블",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="kr">
      <head></head>
      <ReactQueryProvider>
        <StyledComponents>
          <body className={pretandard.className}>
            <StyledLayout>
              <div id="portal" />
              {children}
            </StyledLayout>
          </body>
        </StyledComponents>
      </ReactQueryProvider>
    </html>
  );
}
