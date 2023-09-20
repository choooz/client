import { Button } from "components/button";
import { SortType } from "src/types/common";
import styled, { css } from "styled-components";

import Path from "lib/Path";
import { useRouter } from "next/navigation";
import DrinkItem from "./DrinkItem";
import useGetDrinkListService from "hooks/useGetDrinkList";

interface Props {
  searchText: string;
  sortOption: SortType;
  regionOption: string;
  isSelectedTab: boolean;
}

function DrinkList({ searchText, sortOption, regionOption, isSelectedTab }: Props) {
  const { drinkList, fetchNextPage, hasNextPage } = useGetDrinkListService({
    page: 0,
    size: 3,
    keyword: searchText,
    region: regionOption,
    sortBy: sortOption,
  });

  if (!drinkList) {
    return <></>;
  }

  const onClickDrinkItem = (id: number) => {
    router.push(`${Path.DRINK_INFO_PAGE}/${id}`);
  };
  const router = useRouter();

  const onClickFetchNextPage = () => {
    hasNextPage && fetchNextPage();
  };

  return (
    <Container>
      {drinkList.map((drinkInfo) => (
        <DrinkItem
          key={drinkInfo.id}
          drinkInfo={drinkInfo}
          onClickDrinkItem={() => onClickDrinkItem(drinkInfo.id)}
        />
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
