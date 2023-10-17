"use client";

import { PropsWithChildren } from "react";

import Header from "components/Header";
import VoteHeader from "components/VoteHeader";
import { Button } from "components/button";
import Path from "lib/Path";
import { usePathname, useRouter } from "next/navigation";
import { SvgIcPrevious } from "src/assets/icons/components";
import styled, { css } from "styled-components";

export default function Layout({ children }: PropsWithChildren) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <>
      {pathname === Path.VOTE_HOME ? (
        <Header />
      ) : (
        <VoteHeader
          leftButton={
            <PreviousButton onClick={() => router.back()}>
              <SvgIcPrevious width={24} height={24} />
            </PreviousButton>
          }
        >
          {pathname === Path.POST_PAGE ? "투표 등록" : "상세페이지"}
        </VoteHeader>
      )}
      {children}
    </>
  );
}

const PreviousButton = styled(Button)`
  ${({ theme }) => css`
    margin-left: 20px;
    background-color: ${theme.colors.white};
  `}
`;
