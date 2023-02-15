"use client";

import { useSelect } from "@chooz/ui";
import { CategorySelectBox, SortSelectBox, VoteList } from "components/voteList";
import useInfiniteVoteListService from "services/useInfiniteVoteListService";
import styled from "styled-components";
import { media } from "styles/media";
import { CategoryNameType } from "types/vote";

function VoteListPage() {
  const [isCategoryOpen, onChangeCategoryOpen, categoryOption, onChangeCategoryOption] =
    useSelect("NULL");

  const { voteList, subscribe } = useInfiniteVoteListService({
    size: 3,
    page: 0,
    sortBy: "ByTime",
    category: categoryOption as CategoryNameType, // @Todo 강제 형변환하지 않고 useSelect에 제네릭으로 넘겨주게 하기
  });

  return (
    <PageWrapper>
      <PageInner>
        <FilterSection>
          <CategorySelectBox
            isCategoryOpen={isCategoryOpen}
            onChangeCategoryOpen={onChangeCategoryOpen}
            categoryOption={categoryOption}
            onChangeCategoryOption={onChangeCategoryOption}
          />
          <RightFilterContainer>
            <SortSelectBox />
            <RadioBox>
              <RadioButton type="radio" />
              선택만 보기
            </RadioBox>
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
  flex-direction: row;
  align-items: center;
  width: 183px;
  justify-content: space-between;
`;

const RadioBox = styled.div`
  display: flex;
  align-items: center;
`;

const RadioButton = styled.input`
  margin-right: 6px;
`;

export default VoteListPage;
