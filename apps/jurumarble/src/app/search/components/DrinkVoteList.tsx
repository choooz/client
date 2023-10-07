import { Button } from "components/button";
import { useSearchParams } from "next/navigation";
import styled, { css } from "styled-components";
import useVoteDrinkService from "../services/useVoteDrinkService";
import DrinkVoteItem from "./DrinkVoteItem";

interface Props {
  searchText: string;
  sortOption: string;
  regionOption: string;
  isSelectedTab: boolean;
}

function DrinkVoteList({ searchText, sortOption, regionOption }: Props) {
  const searchParams = useSearchParams();
  const selectedTab = searchParams.get("selectedTab");

  const { voteDrinkList, subscribe } = useVoteDrinkService({
    page: 0,
    size: 3,
    keyword: searchText,
    region: regionOption,
    sortBy: sortOption,
  });

  if (!voteDrinkList) {
    return <></>;
  }

  console.log(voteDrinkList);

  return (
    <Container>
      {voteDrinkList.map((voteDrink, index) => (
        <DrinkVoteItem key={`drinkVoteItem_${index}`} voteDrink={voteDrink} />
      ))}
      {selectedTab === "drinkVote" && <div ref={subscribe}></div>}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 24px;
  gap: 8px;
`;

export default DrinkVoteList;
