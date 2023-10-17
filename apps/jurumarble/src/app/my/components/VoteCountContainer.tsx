"use client";

import { TAB_LIST, TabList } from "src/types/my";
import styled, { css } from "styled-components";

import useGetTheNumberOfMyVoteService from "../services/useGetCountedVoteService";

interface Props {
  selectedTab: string;
  onClickSelectedTab: (tab: TabList) => void;
}

function VoteCountContainer({ selectedTab, onClickSelectedTab }: Props) {
  const theNumberOfMyVote = useGetTheNumberOfMyVoteService();
  const { writtenVoteCnt, joinedVoteCnt, bookmarkedVoteCnt } = theNumberOfMyVote ?? {
    writtenVoteCnt: 0,
    joinedVoteCnt: 0,
    bookmarkedVoteCnt: 0,
  };

  return (
    <Container>
      {TAB_LIST.map(({ id, name }) => {
        return (
          <VoteTypeTab
            key={id}
            onClick={() => onClickSelectedTab(id)}
            isSelected={id === selectedTab}
          >
            <VoteCount>
              {id === "created-vote"
                ? writtenVoteCnt
                : id === "paticipated-vote"
                ? joinedVoteCnt
                : id === "bookmarked-vote"
                ? bookmarkedVoteCnt
                : 0}
            </VoteCount>
            <VoteTypeText>{name}</VoteTypeText>
          </VoteTypeTab>
        );
      })}
    </Container>
  );
}

const Container = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  width: 100%;
  height: 64px;
  padding: 0 20px;
`;

const VoteTypeTab = styled.button<{ isSelected: boolean }>`
  ${({ theme, isSelected }) => css`
    color: ${theme.colors.black_03};
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    padding: 12px;
    ${isSelected &&
    css`
      color: ${theme.colors.black_01};
      border-bottom: 3px solid ${theme.colors.black_01};
    `}
  `}
`;

const VoteCount = styled.span`
  ${({ theme }) => css`
    ${theme.typography.body01}
    margin: 0 auto;
  `}
`;

const VoteTypeText = styled.span`
  ${({ theme }) => css`
    ${theme.typography.body03}
    margin: 0 auto;
  `}
`;

export default VoteCountContainer;
