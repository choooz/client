import { AGE_LIST, MBTI_LIST } from "lib/constants";
import React from "react";
import styled from "styled-components";

function FilterBar() {
  return (
    <Container>
      <FilterBox>
        <Filter>
          <option value="" hidden>
            성별
          </option>
          <option value="MALE">남성</option>
          <option value="FEMALE">여성</option>
        </Filter>
        <Filter>
          <option value="" hidden>
            나이
          </option>
          {AGE_LIST.map(({ id, name }) => (
            <option key={`filter_age_${id}`} value={id}>
              {name}
            </option>
          ))}
        </Filter>
        <Filter>
          <option value="" hidden>
            MBTI
          </option>
          {MBTI_LIST.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </Filter>
      </FilterBox>
      <FilterList>
        <FilterChip>
          <div>여성</div>
          <div>X</div>
        </FilterChip>
        <FilterChip>
          <div>20대</div>
          <div>X</div>
        </FilterChip>
      </FilterList>
    </Container>
  );
}

const Container = styled.div``;

const FilterBox = styled.div`
  padding: 20px 0 15px 0;
  display: flex;
  gap: 8px;
`;

const Filter = styled.select`
  ${({ theme }) => theme.textStyle.Font_Regular}
  border-radius: 4px;
  width: 80px;
  height: 40px;
  border: 1px solid ${({ theme }) => theme.palette.border.base};
`;

const FilterList = styled.div`
  display: flex;
  gap: 8px;
`;

const FilterChip = styled.p`
  display: flex;
  gap: 6px;
  ${({ theme }) => theme.textStyle.Font_Regular}
  border-radius: 100px;
  padding: 6px 8px;
  height: 28px;
  background: ${({ theme }) => theme.palette.main.sub};
  color: ${({ theme }) => theme.palette.ink.lightest};
`;
export default FilterBar;
