"use client";

import { CategorySelectBox, SortSelectBox, VoteList } from "components/voteList";
import { useState } from "react";
import useInfiniteVoteListService from "services/useInfiniteVoteListService";
import styled from "styled-components";
import { media } from "styles/media";
import { CategoryNameType } from "types/vote";

function VoteListPage() {
  const { voteList, subscribe } = useInfiniteVoteListService({
    size: 3,
    sortBy: "ByTime",
  });
  const [selectedCategory, setSelectedCategory] = useState<CategoryNameType>();
  const onChangeCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value as CategoryNameType);
  };
  console.log(voteList);

  return (
    <PageWrapper>
      <PageInner>
        <FilterSection>
          <CategorySelectBox />
          <RightFilterContainer>
            <SortSelectBox />
            <div>
              <input type="checkbox" />
              선택만 보기
            </div>
          </RightFilterContainer>
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
  ${media.medium} {
    padding: 20px 40px;
  }
`;

const FilterSection = styled.div`
  display: flex;
  justify-content: space-between;
`;

const RightFilterContainer = styled.div`
  display: flex;
  align-items: center;
  width: 183px;
  justify-content: space-between;
`;

export default VoteListPage;
