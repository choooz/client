import {
  DRINK_INFO_SORT_LIST,
  DRINK_VOTE_SORT_LIST,
  REGION_LIST,
} from 'lib/constants';

export type DrinkInfoSortType = (typeof DRINK_INFO_SORT_LIST)[number]['value'];
export type VoteSortType = (typeof DRINK_VOTE_SORT_LIST)[number]['value'];
export type RegionType = (typeof REGION_LIST)[number]['value'];
