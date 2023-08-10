import StyledLayout from "components/StyledLayout";
import { pretandard } from "lib/localFont";
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
      <StyledComponents>
        <body className={pretandard.className}>
          <StyledLayout>{children}</StyledLayout>
        </body>
      </StyledComponents>
    </html>
  );
}
