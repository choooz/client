'use client';
/**
 * @TODO react-hookz 제거
 */
import { createContext, PropsWithChildren } from 'react';

import { useToggle } from '@monorepo/hooks';
import { useDebouncedCallback } from '@react-hookz/web';
import { useCreateQueryString } from 'hooks/useCreateQueryString';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { DrinkInfoSortType, RegionType, VoteSortType } from 'src/types/common';
import { DrinkInfo } from 'src/types/drink';
import { Content } from 'src/types/vote';

import { TabList } from '../constants';
import useGetDrinkList from '../services/useGetDrinkList';
import useVoteDrinkService from '../services/useVoteDrinkService';

export const SearchValueContext = createContext<{
  isReplaceLoginPageModal: boolean;
  searchText: string;
  selectedTab: TabList;
  drinkInfoSortOption: DrinkInfoSortType;
  drinkVoteSortOption: VoteSortType;
  regionOption: RegionType;
  isSelectedTab: (tabName: TabList) => boolean;
  drinkList: DrinkInfo[];
  voteDrinkList: Content[];
}>({
  drinkInfoSortOption: 'ByPopularity',
  drinkList: [],
  drinkVoteSortOption: 'ByPopularity',

  isReplaceLoginPageModal: false,
  isSelectedTab: () => false,
  regionOption: '',
  searchText: '',
  selectedTab: 'total',
  voteDrinkList: [],
});

export const SearchChangeContext = createContext<{
  onToggleReplaceLoginPageModal: () => void;
  debouncedChange: (keyword: string) => void;
  onClickSelectedTab: (tab: TabList) => void;
  onChangeDrinkInfoSortOption: (value: DrinkInfoSortType) => void;
  onChangeDrinkVoteSortOption: (value: VoteSortType) => void;
  onChangeRegionOption: (value: RegionType) => void;
  drinkSubscribe: (node: HTMLElement | null) => void;
  drinkVoteSubscribe: (node: HTMLElement | null) => void;
}>({
  debouncedChange: () => {},
  drinkSubscribe: () => {},
  drinkVoteSubscribe: () => {},
  onChangeDrinkInfoSortOption: () => {},
  onChangeDrinkVoteSortOption: () => {},
  onChangeRegionOption: () => {},
  onClickSelectedTab: () => {},
  onToggleReplaceLoginPageModal: () => {},
});

export const SearchProvider = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isReplaceLoginPageModal, onToggleReplaceLoginPageModal] = useToggle();

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

  const selectedTab = (searchParams.get('selectedTab') as TabList) ?? 'total';
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

  const { drinkList, subscribe: drinkSubscribe } = useGetDrinkList({
    page: 0,
    size: selectedTab === 'drinkInfo' ? 10 : 3,
    keyword: searchText,
    region: regionOption,
    sortBy: drinkInfoSortOption,
  });

  const { voteDrinkList, subscribe: drinkVoteSubscribe } = useVoteDrinkService({
    page: 0,
    size: 3,
    keyword: searchText,
    region: regionOption,
    sortBy: drinkVoteSortOption,
  });

  const SearchValue = {
    drinkInfoSortOption,
    drinkList,
    drinkVoteSortOption,
    isReplaceLoginPageModal,
    isSelectedTab,
    regionOption,
    searchText,
    selectedTab,
    voteDrinkList,
  };

  const SearchChangeValue = {
    debouncedChange,
    drinkSubscribe,
    drinkVoteSubscribe,
    onChangeDrinkInfoSortOption,
    onChangeDrinkVoteSortOption,
    onChangeRegionOption,
    onClickSelectedTab,
    onToggleReplaceLoginPageModal,
  };

  return (
    <SearchChangeContext.Provider value={SearchChangeValue}>
      <SearchValueContext.Provider value={SearchValue}>
        {children}
      </SearchValueContext.Provider>
    </SearchChangeContext.Provider>
  );
};
