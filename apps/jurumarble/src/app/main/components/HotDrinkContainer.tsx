'use client';

import { getIsomorphicDate } from '@mogakko/date';
import styled, { css } from 'styled-components';

import Carousel from './Carousel';
import useGetHotDrinkListService from '../services/useGetHotDrinkListService';

const nowTime = getIsomorphicDate().getHours();

function HotDrinkContainer() {
  const { data: hotDrinkList } = useGetHotDrinkListService();
  if (!hotDrinkList) {
    return null;
  }

  return (
    <>
      <H2>
        우리술
        <Main01Color> TOP 10</Main01Color>
      </H2>
      <H3>
        {nowTime}
        시, 지금 가장 인기있는 우리술이에요.
      </H3>
      <Carousel hotDrinkList={hotDrinkList} />
    </>
  );
}

const H2 = styled.h2`
  ${({ theme }) =>
    css`
      ${theme.typography.headline01};
      margin-top: 40px;
    `}
`;

const Main01Color = styled.span`
  color: ${({ theme }) => theme.colors.main_01};
`;

const H3 = styled.h3`
  ${({ theme }) =>
    css`
      ${theme.typography.subhead01};
      color: ${theme.colors.black_02};
      margin-top: 8px;
    `}
`;

export default HotDrinkContainer;
