import Path from 'lib/Path';
import { useRouter } from 'next/navigation';
import { DrinkInfo } from 'src/types/drink';
import styled from 'styled-components';

import DrinkItem from './DrinkItem';
import RegionSelect from './RegionSelect';

interface Props {
  regionOption: string;
  onChangeRegionOption: (value: string) => void;
  drinkList: DrinkInfo[];
}

function StampedDrinkList({
  regionOption,
  onChangeRegionOption,
  drinkList,
}: Props) {
  const router = useRouter();

  return (
    <Container>
      <RegionSelect
        regionOption={regionOption}
        onChangeRegionOption={onChangeRegionOption}
      />
      <DrinkList>
        {drinkList.map((drink) => (
          <DrinkItem
            key={drink.id}
            drinkInfo={drink}
            onClickReplaceDrinkInfo={() =>
              router.push(`${Path.DRINK_INFO_PAGE}/${drink.id}`)
            }
          />
        ))}
      </DrinkList>
    </Container>
  );
}

const Container = styled.section`
  padding: 24px 20px;
`;

const DrinkList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 24px;
`;

export default StampedDrinkList;
