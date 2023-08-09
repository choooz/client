import { pretandard } from "lib/localFont";
import type { Metadata } from "next";
import StyledComponents from "lib/styles/StyledComponents";

export const metadata: Metadata = {
  title: "주루마블",
  description: "주루마블",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="kr">
      <head></head>
      <StyledComponents>
        <body className={pretandard.className}>{children}</body>
      </StyledComponents>
    </html>
  );
}
