import { media } from "@monorepo/ui/styles/media";
import Path from "lib/Path";
import Link from "next/link";
import { SearchIcon } from "public/icons";
import styled, { css } from "styled-components";

interface Props {
  recommendationKeywordList: string[];
}

function SearchRecommendation({ recommendationKeywordList }: Props) {
  return (
    <Container>
      {recommendationKeywordList.map((recommendationKeyword, index) => (
        <Link
          key={`search_recommendation_${index}`}
          href={`${Path.SEARCH_PAGE}/${recommendationKeyword}`}
        >
          <SearchRecommendationItem>
            <SearchRecommendationIcon>
              <SearchIcon variant="searchRecommendation" />
            </SearchRecommendationIcon>
            {recommendationKeyword}
          </SearchRecommendationItem>
        </Link>
      ))}
    </Container>
  );
}

const Container = styled.ul`
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

const SearchRecommendationItem = styled.li`
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

export default SearchRecommendation;
