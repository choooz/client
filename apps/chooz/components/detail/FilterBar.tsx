import { AGE_LIST, MBTI_LIST } from "lib/constants";
import React, { useState } from "react";
import styled from "styled-components";

interface Props {
  filter: {
    age: string;
    mbti: string;
    gender: string;
  };
  onChangeFilter: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onDeleteFilter: (name: string) => void;
}

function FilterBar({ filter, onChangeFilter, onDeleteFilter }: Props) {
  return (
    <Container>
      <FilterBox>
        <Filter value={filter.gender} name="gender" onChange={onChangeFilter}>
          <option value="" hidden>
            성별
          </option>
          <option value="MALE">남성</option>
          <option value="FEMALE">여성</option>
        </Filter>
        <Filter value={filter.age} name="age" onChange={onChangeFilter}>
          <option value="" hidden>
            나이
          </option>
          {AGE_LIST.map(({ id, name }) => (
            <option key={`filter_age_${id}`} value={id}>
              {name}
            </option>
          ))}
        </Filter>
        <Filter value={filter.mbti} name="mbti" onChange={onChangeFilter}>
          <option value="" hidden>
            MBTI
          </option>
          {MBTI_LIST.map(({ value, label }) => (
            <option key={`filter_mbti_${value}`} value={value}>
              {label}
            </option>
          ))}
        </Filter>
      </FilterBox>
      <FilterList>
        {filter.gender && (
          <FilterChip onClick={() => onDeleteFilter("gender")}>
            <div>{filter.gender}</div>
            <div>X</div>
          </FilterChip>
        )}
        {filter.age && (
          <FilterChip onClick={() => onDeleteFilter("age")}>
            <div>{filter.age}</div>
            <div>X</div>
          </FilterChip>
        )}
        {filter.mbti && (
          <FilterChip onClick={() => onDeleteFilter("mbti")}>
            <div>{filter.mbti}</div>
            <div>X</div>
          </FilterChip>
        )}
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
