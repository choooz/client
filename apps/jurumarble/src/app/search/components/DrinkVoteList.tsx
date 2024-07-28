import styled from 'styled-components';

import DrinkVoteItem from './DrinkVoteItem';
import { useSearchChangeContext, useSearchValueContext } from '../context';

function DrinkVoteList() {
  const { voteDrinkList, selectedTab } = useSearchValueContext();
  const { onToggleReplaceLoginPageModal, drinkVoteSubscribe } =
    useSearchChangeContext();

  if (!voteDrinkList) {
    return <></>;
  }

  return (
    <Container>
      {voteDrinkList.map((voteDrink, index) => (
        <DrinkVoteItem
          key={`drinkVoteItem_${index}`}
          voteDrink={voteDrink}
          onToggleReplaceLoginPageModal={onToggleReplaceLoginPageModal}
        />
      ))}
      {selectedTab === 'drinkVote' && <div ref={drinkVoteSubscribe} />}
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
