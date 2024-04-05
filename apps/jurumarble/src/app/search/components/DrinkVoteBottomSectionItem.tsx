import { DRINK_VOTE_SORT_LIST } from 'lib/constants';
import styled from 'styled-components';

import DrinkVoteList from './DrinkVoteList';
import RegionSmallSelect from './RegionSmallSelect';
import SortSelect from './SortSelect';
import { useSearchContext } from '../context';

function DrinkVoteBottomSectionItem() {
  const { drinkVoteSortOption, onChangeDrinkVoteSortOption } =
    useSearchContext();
  return (
    <>
      <SelectContainer>
        <SortSelect
          defaultOption={drinkVoteSortOption}
          onChangeSortOption={onChangeDrinkVoteSortOption}
          options={DRINK_VOTE_SORT_LIST}
        />
        <RegionSmallSelect />
      </SelectContainer>
      <DrinkVoteList />
    </>
  );
}

const SelectContainer = styled.div`
  display: flex;
  margin-top: 40px;
  gap: 4px;
`;

export default DrinkVoteBottomSectionItem;
