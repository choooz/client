import Path from 'lib/Path';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';

import DrinkItem from './DrinkItem';
import { useSearchChangeContext, useSearchValueContext } from '../context';

function DrinkInfoList() {
  const router = useRouter();

  const { drinkList, selectedTab } = useSearchValueContext();

  const { onToggleReplaceLoginPageModal, drinkSubscribe } =
    useSearchChangeContext();

  const onClickDrinkItem = (id: number) => {
    router.push(`${Path.DRINK_INFO_PAGE}/${id}`);
  };

  return (
    <Container>
      {drinkList.map((drinkInfo) => (
        <DrinkItem
          key={drinkInfo.id}
          drinkInfo={drinkInfo}
          onClickDrinkItem={() => onClickDrinkItem(drinkInfo.id)}
          onToggleReplaceLoginPageModal={onToggleReplaceLoginPageModal}
        />
      ))}
      {selectedTab === 'drinkInfo' && <div ref={drinkSubscribe} />}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 24px;
`;

export default DrinkInfoList;
