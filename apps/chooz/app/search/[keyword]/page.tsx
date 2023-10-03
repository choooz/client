"use client";

import useInfiniteSearchResultService from "services/useInfiniteSearchResultService";
import styled from "styled-components";
import { media } from "@monorepo/ui/styles/media";
import { VoteList } from "../components";

function SearchResultPage({ params }: { params: { keyword: string } }) {
  const { voteList, subscribe } = useInfiniteSearchResultService({
    size: 3,
    sortBy: "ByTime",
    category: null,
    keyword: decodeURI(params.keyword),
  });
  return (
    <PageWrapper>
      <PageInner>
        <FilterSection>
          {/* @Note 쿼리 스트링에 한글이 들어가면 인코딩이 되어서 들어감 
          근데 이걸 decodeURI로 디코딩해주면 한글이 깨져서 나옴 */}
          <ResultText>"{decodeURI(params.keyword)}"에 대한 검색 결과</ResultText>
          <VoteLength>
            총 <span>{voteList.length.toLocaleString()}</span>건
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
