"use client";

import Path from "lib/Path";
import Link from "next/link";
import styled from "styled-components";

export default function Home() {
  return (
    <PageLayout>
      <Link href={Path.LOGIN_PAGE}>로그인 하러가기</Link>
      <Link href={Path.REGISTER_PAGE}>회원가입 하러가기</Link>
      <Link href={Path.REGISTER_INTERSTER_PAGE}>관심사 보러가기</Link>
      <Link href={Path.POST_PAGE}>투표 글쓰기 보러가기</Link>
      <Link href="/select">선택 페이지 보러가기</Link>
      <Link href={Path.VOTE_LIST_PAGE}>투표 리스트 보러가기</Link>
    </PageLayout>
  );
}

const PageLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${({ theme }) => theme.palette.background.white};
`;
