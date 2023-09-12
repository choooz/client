"use client";

import { media } from "@monorepo/ui/styles/media";
import { MY_PAGE_VOTE_TYPE } from "lib/constants";
import { Suspense, useState } from "react";
import styled, { css } from "styled-components";
import TabContainer from "./components/TabContainer";
import VoteList from "./components/VoteList";
import CountVoteContainer from "./components/VoteCountContainer";
import { MyVoteListType } from "types/my";
import useInfiniteMyVoteListService from "./services/useInfiniteMyPageVoteListService";
import UserInfoContainer from "./components/UserInfoContainer";
import { AsyncBoundary } from "../../lib/AsyncBoundary";

function MyPage() {
  const [selectedTab, setSelectedTab] = useState<MyVoteListType>("created");

  const onClickSelectedTab = (e: React.MouseEvent<HTMLButtonElement>) => {
    setSelectedTab(e.currentTarget.value as MyVoteListType);
  };

  const { voteList, subscribe } = useInfiniteMyVoteListService({
    size: 7,
    voteType: selectedTab,
  });

  return (
    <PageWrapper>
      <PageInner>
        <AsyncBoundary>
          <UserInfoContainer />
        </AsyncBoundary>
        <CountVoteContainer />
      </PageInner>
      <TabContainerWrapper>
        <TabContainer
          tabList={MY_PAGE_VOTE_TYPE}
          selectedTab={selectedTab}
          onClickSelectedTab={onClickSelectedTab}
        />
      </TabContainerWrapper>
      <VoteListSection>
        <VoteList voteList={voteList} />
        <div ref={subscribe} />
      </VoteListSection>
    </PageWrapper>
  );
}

const PageWrapper = styled.div`
  width: 100%;
  ${({ theme }) => theme.textStyle.Font_Minimum};
`;

const PageInner = styled.div`
  margin: 0 auto;
  border-radius: 4px;
  max-width: 640px;
  position: relative;
  padding: 20px;
  padding-bottom: 40px;

  ${({ theme }) =>
    css`
      background-color: ${theme.palette.background.darkest};
      color: ${theme.palette.ink.lightest};
    `};
  ${media.medium} {
    padding: 20px 40px;
  }
`;

const TabContainerWrapper = styled.div`
  position: relative;
  top: -8px;
`;

const VoteListSection = styled.section`
  position: relative;
  bottom: 9px;
  background-color: ${({ theme }) => theme.palette.background.white};
  height: 100%;
  max-width: 640px;
  margin: 0 auto;
  /* 55px은 헤더 높이이고 그 뒤의 값을 해당 섹션의 높이로 할려고 했는데, 해더의 높이가 작아져서 큰 값으로 설정  */
  height: calc(100vh - 55px - 280px);
  overflow-y: scroll;
  padding: 0 20px 20px;
  ${media.medium} {
    padding: 20px 40px 40px;
  }
`;

export default MyPage;
