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

export const SearchContext = createContext<{
  isReplaceLoginPageModal: boolean;
  onToggleReplaceLoginPageModal: () => void;
  searchText: string;
  debouncedChange: (keyword: string) => void;
  selectedTab: TabList;
  onClickSelectedTab: (tab: TabList) => void;
  drinkInfoSortOption: DrinkInfoSortType;
  onChangeDrinkInfoSortOption: (value: DrinkInfoSortType) => void;
  drinkVoteSortOption: VoteSortType;
  onChangeDrinkVoteSortOption: (value: VoteSortType) => void;
  regionOption: RegionType;
  onChangeRegionOption: (value: RegionType) => void;
  isSelectedTab: (tabName: TabList) => boolean;
  drinkList: DrinkInfo[];
  drinkSubscribe: (node: HTMLElement | null) => void;
  voteDrinkList: Content[];
  drinkVoteSubscribe: (node: HTMLElement | null) => void;
}>({
  debouncedChange: () => {},
  drinkInfoSortOption: 'ByPopularity',
  drinkList: [],
  drinkSubscribe: () => {},
  drinkVoteSortOption: 'ByPopularity',
  drinkVoteSubscribe: () => {},
  isReplaceLoginPageModal: false,
  isSelectedTab: () => false,
  onChangeDrinkInfoSortOption: () => {},
  onChangeDrinkVoteSortOption: () => {},
  onChangeRegionOption: () => {},
  onClickSelectedTab: () => {},
  onToggleReplaceLoginPageModal: () => {},
  regionOption: '',
  searchText: '',
  selectedTab: 'total',
  voteDrinkList: [],
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

  const value = {
    debouncedChange,
    drinkInfoSortOption,
    drinkList,
    drinkSubscribe,
    drinkVoteSortOption,
    drinkVoteSubscribe,
    isReplaceLoginPageModal,
    isSelectedTab,
    onChangeDrinkInfoSortOption,
    onChangeDrinkVoteSortOption,
    onChangeRegionOption,
    onClickSelectedTab,
    onToggleReplaceLoginPageModal,
    regionOption,
    searchText,
    selectedTab,
    voteDrinkList,
  };

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
};
