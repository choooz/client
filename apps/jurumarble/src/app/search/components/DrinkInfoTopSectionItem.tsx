import { DRINK_INFO_SORT_LIST } from 'lib/constants';
import styled from 'styled-components';

import DrinkInfoList from './DrinkInfoList';
import RegionSmallSelect from './RegionSmallSelect';
import SortSelect from './SortSelect';
import { useSearchContext } from '../context';

function DrinkInfoTopSectionItem() {
  const { drinkInfoSortOption, onChangeDrinkInfoSortOption } =
    useSearchContext();
  return (
    <>
      <SelectContainer>
        <SortSelect
          defaultOption={drinkInfoSortOption}
          onChangeSortOption={onChangeDrinkInfoSortOption}
          options={DRINK_INFO_SORT_LIST}
        />
        <RegionSmallSelect />
      </SelectContainer>
      <DrinkInfoList />
    </>
  );
}

const SelectContainer = styled.div`
  display: flex;
  margin-top: 40px;
  gap: 4px;
`;

export default DrinkInfoTopSectionItem;
