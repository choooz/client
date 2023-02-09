"use client";

import Link from "next/link";
import styled from "styled-components";

export default function Home() {
  return (
    <PageLayout>
      <Link href="/login">로그인 하러가기</Link>
      <Link href="/register">회원가입 하러가기</Link>
      <Link href="/register/interest">관심사 보러가기</Link>
      <Link href="/post">투표 글쓰기 보러가기</Link>
      <Link href="/select/1">선택 페이지 보러가기</Link>
    </PageLayout>
  );
}

const PageLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${({ theme }) => theme.palette.background.white};
`;
