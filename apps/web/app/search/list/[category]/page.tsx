"use client";

import { CategorySelect, SortSelect, VoteList } from "components/vote-list";
import { useState } from "react";
import useInfiniteVoteListService from "services/useInfiniteVoteListService";
import styled from "styled-components";
import { media } from "styles/media";
import { CategoryNameType } from "types/vote";

function CategoryPage({ params }: { params: { keyword: string } }) {
  const [categoryOption, setCategoryOption] = useState("");

  const onChangeCategoryOption = (value: string) => {
    setCategoryOption(value);
  };

  const [sortOption, setSortOption] = useState("ByTime");

  const onChangeSortOption = (value: string) => {
    setSortOption(value);
  };

  const { voteList, subscribe } = useInfiniteVoteListService({
    size: 3,
    sortBy: "ByTime",
    category: categoryOption as CategoryNameType, // @Todo 강제 형변환하지 않고 useSelect에 제네릭으로 넘겨주게 하기
  });

  return (
    <PageWrapper>
      <PageInner>
        <FilterSection>
          <CategorySelect
            categoryOption={categoryOption}
            onChangeCategoryOption={onChangeCategoryOption}
          />
          <RightFilterContainer>
            <SortSelect sortOption={sortOption} onChangeSortOption={onChangeSortOption} />
            <CheckVoteForMe>
              <CheckBox type="checkbox" id="checkbox" />
              <label htmlFor="checkbox">선택만 보기</label>
            </CheckVoteForMe>
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

const RightFilterContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 183px;
  justify-content: space-between;
`;

const CheckVoteForMe = styled.div`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.palette.ink.dark};
  ${({ theme }) => theme.textStyle.Font_Regular};
  > * {
    cursor: pointer;
  }
`;

const CheckBox = styled.input`
  width: 20px;
  height: 20px;
  appearance: none;
  transition: background 0.2s;
  border-radius: 100px;
  border: solid 1px ${({ theme }) => theme.palette.border.base};
  margin-right: 6px;
  :checked {
    border: none;
    background-image: url("/icons/CheckedIcon.svg");
  }
`;

export default CategoryPage;
