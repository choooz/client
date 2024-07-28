import { Button } from 'components/button';
import styled, { css } from 'styled-components';

import DrinkVoteList from './DrinkVoteList';
import { TabList } from '../constants';
import { useSearchChangeContext } from '../context';

function TotalBottomSectionItem() {
  const { onClickSelectedTab } = useSearchChangeContext();
  return (
    <>
      <H2>우리술 투표</H2>
      <DrinkVoteList />
      <MoreButton
        variant="outline"
        width="100%"
        height="48px"
        value="drinkVote"
        onClick={(e) => onClickSelectedTab(e.currentTarget.value as TabList)}
      >
        우리술 투표 더보기
      </MoreButton>
    </>
  );
}

const H2 = styled.h2`
  ${({ theme }) => css`
    ${theme.typography.headline02};
    color: ${theme.colors.black_01};
    margin-top: 40px;
  `}
`;

const MoreButton = styled(Button)`
  ${({ theme }) => css`
    ${theme.typography.body01}
    margin: 24px 0 40px 0;
  `};
`;

export default TotalBottomSectionItem;
