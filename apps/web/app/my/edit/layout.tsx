"use client";

import Header from "components/common/Header";

export default function Layout({ children }: any) {
  return (
    <>
      <Header leftMenu="back" rightMenu="menu" />
      <main>{children}</main>
    </>
  );
}
