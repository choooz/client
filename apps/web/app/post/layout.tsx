"use client";

import Header from "components/common/Header";

export default function Layout({ children }: any) {
  return (
    <>
      <Header leftMenu="back" centerMenu="A or B 만들기" />
      <main>{children}</main>
    </>
  );
}
