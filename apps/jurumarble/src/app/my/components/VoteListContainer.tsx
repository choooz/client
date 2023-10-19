'use client';

import { useCreateQueryString } from 'hooks/useCreateQueryString';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { TabList } from 'src/types/my';
import styled, { css } from 'styled-components';

import VoteCountContainer from './VoteCountContainer';
import VoteItem from './VoteItem';
import useGetMyBookmarkedVoteListService from '../services/useGetMyBookmarkedVoteListService';
import useGetMyCreatedVoteListService from '../services/useGetMyCreatedVoteListService';
import useGetMyParticipatedVoteListService from '../services/useGetMyParticipatedVoteListService';

/**
 * @TODO 타입 수정 필요
 */

const MY_VOTE_LIST_SERVICE = {
  'created-vote': useGetMyCreatedVoteListService,
  'bookmarked-vote': useGetMyBookmarkedVoteListService,
  'paticipated-vote': useGetMyParticipatedVoteListService,
};

function VoteListContainer() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCreateQueryString(searchParams);

  const selectedTab =
    (searchParams.get('selectedTab') as TabList) ?? 'created-vote';
  const onClickSelectedTab = (tab: TabList) => {
    router.replace(`${pathname}?${createQueryString('selectedTab', tab)}`);
  };

  const { myVoteList, subscribe } = MY_VOTE_LIST_SERVICE[selectedTab]({
    page: 0,
    size: 10,
  });

  return (
    <>
      <VoteCountContainer
        selectedTab={selectedTab}
        onClickSelectedTab={onClickSelectedTab}
      />
      <Container>
        <VoteList>
          {myVoteList.map(
            ({
              voteId,
              region,
              title,
              imageA,
              imageB,
              votedCount,
              createdAt,
            }) => (
              <VoteItem
                key={voteId}
                voteId={voteId}
                region={region}
                title={title}
                imageA={imageA}
                imageB={imageB}
                votedCount={votedCount}
                createdAt={createdAt}
              />
            ),
          )}
        </VoteList>
        <div ref={subscribe} />
      </Container>
    </>
  );
}

const Container = styled.section`
  ${({ theme }) => css`
    background-color: ${theme.colors.bg_02};
    padding: 24px 20px 80px 20px;
  `};
`;

const VoteList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export default VoteListContainer;
