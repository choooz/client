import { Button } from "components/button";
import styled, { css } from "styled-components";
import useVoteDrinkService from "../services/useVoteDrinkService";
import DrinkVoteItem from "./DrinkVoteItem";

interface Props {
  searchText: string;
  sortOption: string;
  regionOption: string;
  isSelectedTab: boolean;
}

function DrinkVoteList({ searchText, sortOption, regionOption, isSelectedTab }: Props) {
  const { voteDrinkList, fetchNextPage, hasNextPage } = useVoteDrinkService({
    page: 0,
    size: 3,
    keyword: searchText,
    region: regionOption,
    sortBy: sortOption,
  });

  if (!voteDrinkList) {
    return <></>;
  }

  const onClickFetchNextPage = () => {
    hasNextPage && fetchNextPage();
  };

  return (
    <Container>
      {voteDrinkList.map((voteDrink, index) => (
        <DrinkVoteItem key={`drinkVoteItem_${index}`} voteDrink={voteDrink} />
      ))}
      {!isSelectedTab && (
        <MoreButton variant="outline" width="100%" height="48px" onClick={onClickFetchNextPage}>
          우리술 투표 더보기
        </MoreButton>
      )}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 24px;
  gap: 8px;
`;

const MoreButton = styled(Button)`
  ${({ theme }) => css`
    ${theme.typography.body01}
    margin: 24px 0 40px 0;
  `};
`;

export default DrinkVoteList;
