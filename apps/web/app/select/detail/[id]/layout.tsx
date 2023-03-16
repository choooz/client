"use client";

import Header from "components/common/Header";

export default function Layout({ children }: any) {
  return (
    <>
      <Header leftMenu="back" centerMenu="상세페이지" />
      <main>{children}</main>
    </>
  );
}
