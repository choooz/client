import { REGION_LIST, SORT_LIST } from "lib/constants";

export type SortType = (typeof SORT_LIST)[number]["value"];
export type RegionType = (typeof REGION_LIST)[number]["value"];
