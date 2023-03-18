"use client";

import { useToggle } from "@chooz/hooks";
import { Button, transitions } from "@chooz/ui";
import { media } from "@chooz/ui/styles/media";
import { IMAGE_CATEGORY_LIST } from "lib/constants";
import Image from "next/image";
import { SearchIcon } from "public/icons";
import { CheckRound } from "public/images";
import useRegisterService from "services/useRegisterService";
import styled, { css } from "styled-components";

function SearchPage() {
  const { categoryLists, onClickCategory } = useRegisterService();

  const [isSearchRecommendation, onToggleSearchRecommendation] = useToggle();

  return (
    <PageWrapper>
      <PageInner>
        <Search>
          <SearchInput
            placeholder="검색어를 입력하세요."
            isSearchRecommendation={isSearchRecommendation}
            onFocus={onToggleSearchRecommendation}
            onBlur={onToggleSearchRecommendation}
          />
          <SearchButton isSearchRecommendation={isSearchRecommendation}>
            <SearchIcon variant="primary" />
          </SearchButton>
        </Search>
        {isSearchRecommendation && (
          <SearchRecommendationContainer>
            <SearchRecommendation>
              <SearchRecommendationIcon>
                <SearchIcon variant="searchRecommendation" />
              </SearchRecommendationIcon>
              dsads
            </SearchRecommendation>
            <SearchRecommendation>
              <SearchRecommendationIcon>
                <SearchIcon variant="searchRecommendation" />
              </SearchRecommendationIcon>
              dsads
            </SearchRecommendation>
            <SearchRecommendation>
              <SearchRecommendationIcon>
                <SearchIcon variant="searchRecommendation" />
              </SearchRecommendationIcon>
              dsads
            </SearchRecommendation>
          </SearchRecommendationContainer>
        )}

        <CategorySection>
          {/* @Todo 컴포넌트화 하기 */}
          {IMAGE_CATEGORY_LIST.map(({ image, value, label }) => (
            <Category
              width="100%"
              height="104px"
              borderRadius="10px"
              key={`profile_edit_page_${value}`}
              selected={categoryLists.includes(value)}
              onClick={onClickCategory}
              name={value}
            >
              <Image alt="항목" src={image} height={32} />
              <CategoryText>
                {categoryLists.includes(value) && (
                  <CheckBoxWrapper>
                    <Image alt="선택" src={CheckRound} width={16} />
                  </CheckBoxWrapper>
                )}
                {label}
              </CategoryText>
            </Category>
          ))}
        </CategorySection>
      </PageInner>
    </PageWrapper>
  );
}

const PageWrapper = styled.div`
  /* display: flex;
  align-items: center;
  justify-content: center; */
`;

const PageInner = styled.div`
  position: relative;
  margin: 0 auto;
  max-width: 588px;
`;

const Search = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SearchInput = styled.input<{ isSearchRecommendation: boolean }>`
  width: 100%;
  height: 40px;
  padding: 10px;
  font-weight: 700;
  border-radius: 4px 0 0 4px;
  ${({ theme, isSearchRecommendation }) =>
    css`
      background-color: ${theme.palette.background.darker};
      color: ${theme.palette.ink.lighter};
      ::placeholder {
        color: ${theme.palette.ink.lighter};
      }
      ${media.medium} {
        height: 56px;
        padding: 16px;
        border-radius: 10px 0 0 10px;
        ${isSearchRecommendation &&
        css`
          border-bottom-left-radius: 0;
        `};
      }
    `};
`;

const SearchButton = styled.button<{ isSearchRecommendation: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0 4px 4px 0;
  width: 40px;
  height: 40px;
  ${({ theme, isSearchRecommendation }) =>
    css`
      background-color: ${theme.palette.main.point};
      ${media.medium} {
        width: 52px;
        height: 56px;
        border-radius: 0 10px 10px 0;
        ${isSearchRecommendation &&
        css`
          border-bottom-right-radius: 0;
        `};
      }
    `}
`;

const SearchRecommendationContainer = styled.ul`
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 99;
  border-radius: 0 0 10px 10px;

  ${({ theme }) => css`
    color: ${theme.palette.ink.lighter};
    background-color: ${theme.palette.background.black};
  `};
  ${media.medium} {
    background-color: ${({ theme }) => theme.palette.background.darker};
  }
`;

const SearchRecommendation = styled.li`
  display: flex;
  align-items: center;
  margin-top: 24px;
`;

const SearchRecommendationIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  margin: 0 8px 0 8px;
  border-radius: 100px;
  background-color: ${({ theme }) => theme.palette.background.dark};
`;

const CategorySection = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 9px;
  margin-top: 24px;
  max-width: 588px;

  ${media.medium} {
    grid-template-columns: 1fr 1fr 1fr;
    gap: 14px 16px;
    margin-top: 40px;
  }
`;

const Category = styled(Button)<{ selected: boolean }>`
  position: relative;
  flex-direction: column;
  gap: 8px;
  font-weight: 400;
  background-color: ${({ theme }) => theme.palette.background.soft};
  border: 1px solid ${({ theme }) => theme.palette.border.base};
  ${({ theme }) => theme.textStyle.Title_Small};
  ${({ theme, selected }) =>
    selected &&
    css`
      animation: ${transitions.blink} 0.7s ease-in-out;
      background-color: ${theme.palette.background.selected};
      border: 1px solid ${theme.palette.main.point};
      font-weight: 700;
    `}
`;

const CategoryText = styled.div`
  align-items: center;
  display: flex;
  gap: 4px;
`;

const CheckBoxWrapper = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;
`;

export default SearchPage;
