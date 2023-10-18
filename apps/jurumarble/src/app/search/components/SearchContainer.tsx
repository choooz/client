'use client';

import { useDebouncedCallback } from '@react-hookz/web';
import BottomBar from 'components/BottomBar';
import DivideLine from 'components/DivideLine';
import SearchInput from 'components/SearchInput';
import { Button } from 'components/button';
import { useCreateQueryString } from 'hooks/useCreateQueryString';
import { DRINK_INFO_SORT_LIST, DRINK_VOTE_SORT_LIST } from 'lib/constants';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import SvgIcPrev from 'src/assets/icons/components/IcPrev';
import { DrinkInfoSortType, RegionType, VoteSortType } from 'src/types/common';
import styled, { css, DefaultTheme } from 'styled-components';

import DrinkList from './DrinkList';
import DrinkVoteList from './DrinkVoteList';
import RegionSmallSelect from './RegionSmallSelect';
import SortSelect from './SortSelect';

const TAB_LIST = [
  { id: 'total', name: '통합' },
  { id: 'drinkInfo', name: '우리술 정보' },
  { id: 'drinkVote', name: '우리술 투표' },
] as const;

type TabList = (typeof TAB_LIST)[number]['id'];

/**
 * @TODO 아래와 같이 분리하기
 * <SeachProvider>
 * <SearchInputContainer />
 * <SearchVoteListContainer />
 * </SearchProvider>
 *
 * @TODO 검색 상태를 관리하는 Context를 만들기
 * const {textInput} = useSearchContext()
 */

function SearchContainer() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCreateQueryString(searchParams);

  const searchText = (searchParams.get('searchText') as string) ?? '';

  const onChangeSearchText = (keyword: string) => {
    router.replace(`${pathname}?${createQueryString('searchText', keyword)}`, {
      scroll: true,
    });
  };
  const debouncedChange = useDebouncedCallback(
    (keyword: string) => {
      onChangeSearchText(keyword);
    },
    [onChangeSearchText],
    500,
  );

  const selectedTab = searchParams.get('selectedTab') ?? 'total';
  const onClickSelectedTab = (tab: TabList) => {
    router.replace(`${pathname}?${createQueryString('selectedTab', tab)}`);
  };

  const drinkInfoSortOption =
    searchParams.get('drinkInfoSortOption') ?? 'ByPopularity';
  const onChangeDrinkInfoSortOption = (value: DrinkInfoSortType) => {
    router.replace(
      `${pathname}?${createQueryString('drinkInfoSortOption', value)}`,
    );
  };

  const drinkVoteSortOption =
    searchParams.get('drinkVoteSortOption') ?? 'ByPopularity';
  const onChangeDrinkVoteSortOption = (value: VoteSortType) => {
    router.replace(
      `${pathname}?${createQueryString('drinkVoteSortOption', value)}`,
    );
  };

  const regionOption = searchParams.get('regionOption') ?? '';
  const onChangeRegionOption = (value: RegionType) => {
    router.replace(`${pathname}?${createQueryString('regionOption', value)}`);
  };

  const isSelectedTab = (tabName: TabList) => {
    return selectedTab === tabName;
  };

  const renderItem: Record<
    TabList,
    { topSectionItem: JSX.Element; bottomSectionItem: JSX.Element }
  > = {
    total: {
      topSectionItem: (
        <>
          <H2>우리술 정보</H2>
          <DrinkList
            searchText={searchText}
            sortOption={drinkInfoSortOption}
            regionOption={regionOption}
            isSelectedTab={isSelectedTab('total')}
          />
          <MoreButton
            variant="outline"
            width="100%"
            height="48px"
            value="drinkInfo"
            onClick={(e) =>
              onClickSelectedTab(e.currentTarget.value as TabList)
            }
          >
            우리술 정보 더보기
          </MoreButton>
        </>
      ),
      bottomSectionItem: (
        <>
          <H2>우리술 투표</H2>
          <DrinkVoteList
            searchText={searchText}
            sortOption={drinkVoteSortOption}
            regionOption={regionOption}
            isSelectedTab={isSelectedTab('total')}
          />
          <MoreButton
            variant="outline"
            width="100%"
            height="48px"
            value="drinkVote"
            onClick={(e) =>
              onClickSelectedTab(e.currentTarget.value as TabList)
            }
          >
            우리술 투표 더보기
          </MoreButton>
        </>
      ),
    },
    drinkInfo: {
      topSectionItem: (
        <>
          <SelectContainer>
            <SortSelect
              defaultOption={drinkInfoSortOption}
              onChangeSortOption={onChangeDrinkInfoSortOption}
              options={DRINK_INFO_SORT_LIST}
            />
            <RegionSmallSelect
              defaultOption={regionOption}
              onChangeSortOption={onChangeRegionOption}
            />
          </SelectContainer>
          <DrinkList
            searchText={searchText}
            sortOption={drinkInfoSortOption}
            regionOption={regionOption}
            isSelectedTab={false}
          />
        </>
      ),
      bottomSectionItem: <></>,
    },
    drinkVote: {
      topSectionItem: <></>,
      bottomSectionItem: (
        <>
          <SelectContainer>
            <SortSelect
              defaultOption={drinkVoteSortOption}
              onChangeSortOption={onChangeDrinkVoteSortOption}
              options={DRINK_VOTE_SORT_LIST}
            />
            <RegionSmallSelect
              defaultOption={regionOption}
              onChangeSortOption={onChangeRegionOption}
            />
          </SelectContainer>
          <DrinkVoteList
            searchText={searchText}
            sortOption={drinkVoteSortOption}
            regionOption={regionOption}
            isSelectedTab={isSelectedTab('total')}
          />
        </>
      ),
    },
  };
  const { topSectionItem, bottomSectionItem } =
    renderItem[selectedTab as TabList];

  return (
    <>
      <TopSection>
        <SearchBox>
          <SvgIcPrev width={24} height={24} />
          <SearchInput value={searchText} onChange={debouncedChange} />
        </SearchBox>
        <TabBox>
          {TAB_LIST.map(({ id, name }) => (
            <SelectedButton
              key={`tab_${id}`}
              value={id}
              selected={id === selectedTab}
              onClick={(e) =>
                onClickSelectedTab(e.currentTarget.value as TabList)
              }
            >
              {name}
            </SelectedButton>
          ))}
        </TabBox>
        {topSectionItem}
      </TopSection>
      {isSelectedTab('total') && <DivideLine />}
      <BottomSection>{bottomSectionItem}</BottomSection>
      <BottomBar />
    </>
  );
}

const TopSection = styled.section`
  padding: 0 20px;
`;

const SearchBox = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`;

const TabBox = styled.ul`
  display: flex;
  margin-top: 8px;
`;

const SelectedButton = styled.button<{
  theme: DefaultTheme;
  selected: boolean;
}>`
  ${({ theme, selected }) =>
    css`
      ${theme.typography.body02};
      color: ${theme.colors.black_03};
      padding: 16.5px 12px;

      ${selected
        ? css`
            ${theme.typography.body01};
            color: ${theme.colors.black_01};
            border-bottom: 3px solid ${theme.colors.black_01};
          `
        : css`
            display: flex;
          `}
    `}
`;

const SelectContainer = styled.div`
  display: flex;
  margin-top: 40px;
  gap: 4px;
`;

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

const BottomSection = styled.section`
  padding: 0 20px 96px; // 64(BottomBar height) + 32(margin) = 96
  overflow: auto;
`;

export default SearchContainer;
