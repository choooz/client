import { pretandard } from "lib/localFont";
import StyledComponentsRegistry from "lib/registory";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "주루마블",
  description: "주루마블",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="kr">
      <head></head>
      <StyledComponentsRegistry>
        <body className={pretandard.className}>{children}</body>
      </StyledComponentsRegistry>
    </html>
  );
}
