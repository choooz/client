"use client";

import VoteItem from "components/voteList/VoteItem";
import { CATEGORY_LIST } from "lib/constants";
import { FilterIcon } from "public/icons";
import styled from "styled-components";
import { media } from "styles/media";

function VoteListPage() {
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
        <VoteItem />
        <VoteItem />
        <VoteItem />
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
