import { media } from "@monorepo/ui/styles/media";
import Link from "next/link";
import { SearchIcon } from "public/icons";
import styled, { css } from "styled-components";

interface Props {
  isSearchRecommendation: boolean;
  onToggleSearchRecommendation: () => void;
  onChangeKeyword: (e: React.ChangeEvent<HTMLInputElement>) => void;
  keyword: string;
}

function SearchInput({
  isSearchRecommendation,
  onToggleSearchRecommendation,
  onChangeKeyword,
  keyword,
}: Props) {
  return (
    <Search>
      <InputStyled
        placeholder="검색어를 입력하세요."
        isSearchRecommendation={isSearchRecommendation}
        onFocus={onToggleSearchRecommendation}
        onChange={onChangeKeyword}
      />
      <Link href={`search/${keyword}`}>
        <SearchButton isSearchRecommendation={isSearchRecommendation}>
          <SearchIcon variant="primary" />
        </SearchButton>
      </Link>
    </Search>
  );
}
const Search = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const InputStyled = styled.input<{ isSearchRecommendation: boolean }>`
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

export default SearchInput;
