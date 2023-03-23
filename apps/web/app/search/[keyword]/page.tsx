"use client";

import { VoteList } from "components/vote-list";

import useInfiniteSearchResultService from "services/useInfiniteSearchResultService";
import styled from "styled-components";
import { media } from "styles/media";

function SearchResultPage({ params }: { params: { keyword: string } }) {
  const { voteList, subscribe } = useInfiniteSearchResultService({
    size: 3,
    sortBy: "ByTime",
    category: null,
    keyword: params.keyword,
  });
  return (
    <PageWrapper>
      <PageInner>
        <FilterSection>
          <ResultText>"{params.keyword}"에 대한 검색 결과</ResultText>
          <VoteLength>
            총 <span>{voteList.length}</span>건
          </VoteLength>
        </FilterSection>
        <VoteList voteList={voteList} />
        <div ref={subscribe} />
      </PageInner>
    </PageWrapper>
  );
}

const PageWrapper = styled.div`
  width: 100%;
`;

const PageInner = styled.div`
  margin: 0 auto;
  border-radius: 4px;
  background-color: white;
  max-width: 640px;
  position: relative;
  padding: 20px;
  height: calc(100vh - 30px - 55px);
  overflow-y: scroll;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
  ${media.medium} {
    padding: 20px 40px;
  }
`;

const FilterSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ResultText = styled.span`
  ${({ theme }) => theme.textStyle.Title_Medium};
  font-family: NeoDunggeunmo, Pretendard Variable, -apple-system, BlinkMacSystemFont, system-ui,
    Roboto, "Helvetica Neue";
`;

const VoteLength = styled.span`
  color: ${({ theme }) => theme.palette.ink.base};
  span {
    font-weight: 700;
  }
`;

export default SearchResultPage;
