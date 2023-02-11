"use client";

import { VoteList } from "components/voteList";
import { CATEGORY_LIST } from "lib/constants";
import { FilterIcon } from "public/icons";
import useInfiniteVoteListService from "services/useInfiniteVoteListService";
import styled from "styled-components";
import { media } from "styles/media";

function VoteListPage() {
  const { voteList, subscribe } = useInfiniteVoteListService({
    size: 3,
    sortBy: "ByTime",
  });

  return (
    <PageWrapper>
      <PageInner>
        <FilterContainer>
          <CategorySelect>
            {CATEGORY_LIST.map(({ id, name }) => (
              <Option key={id}>{name}</Option>
            ))}
          </CategorySelect>
          <FilterBox>
            <FilterIcon />
            필터
          </FilterBox>
        </FilterContainer>
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
  ${media.medium} {
    padding: 20px 40px;
  }
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CategorySelect = styled.select``;
const Option = styled.option``;
const FilterBox = styled.div`
  display: flex;
`;

export default VoteListPage;
