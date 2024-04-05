import { Button } from 'components/button';
import styled, { css } from 'styled-components';

import DrinkInfoList from './DrinkInfoList';
import { TabList } from '../constants';
import { useSearchContext } from '../context';

function TotalTopSectionItem() {
  const { onClickSelectedTab } = useSearchContext();
  return (
    <>
      <H2>우리술 정보</H2>
      <DrinkInfoList />
      <MoreButton
        variant="outline"
        width="100%"
        height="48px"
        value="drinkInfo"
        onClick={(e) => onClickSelectedTab(e.currentTarget.value as TabList)}
      >
        우리술 정보 더보기
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

export default TotalTopSectionItem;
