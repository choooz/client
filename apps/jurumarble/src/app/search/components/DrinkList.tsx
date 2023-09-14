import { Button } from "components/button";
import DrinkItem from "components/DrinkItem";
import { SortType } from "src/types/common";
import styled, { css } from "styled-components";
import useSearchDrinkService from "../services/useDrinkService";

interface Props {
  searchText: string;
  sortOption: string;
  regionOption: string;
  isSelectedTab: boolean;
}

function DrinkList({ searchText, sortOption, regionOption, isSelectedTab }: Props) {
  const { drinkList, fetchNextPage, hasNextPage } = useSearchDrinkService({
    page: 0,
    size: 3,
    keyword: searchText,
    region: regionOption,
    sortBy: sortOption as SortType,
  });

  if (!drinkList) {
    return <></>;
  }

  const onClickFetchNextPage = () => {
    hasNextPage && fetchNextPage();
  };

  return (
    <Container>
      {drinkList.map((drinkInfo) => (
        <DrinkItem key={drinkInfo.id} drinkInfo={drinkInfo} />
      ))}
      {!isSelectedTab && (
        <MoreButton variant="outline" width="100%" height="48px" onClick={onClickFetchNextPage}>
          우리술 정보 더보기
        </MoreButton>
      )}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 24px;
`;

const MoreButton = styled(Button)`
  ${({ theme }) => css`
    ${theme.typography.body01}
    margin: 24px 0 40px 0;
  `};
`;
export default DrinkList;
