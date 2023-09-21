import { DrinkInfoSortType } from "src/types/common";
import { baseApi } from "./http/base";

export interface GetDrinkListRequest {
  page: number;
  size: number;
  keyword?: string;
  region?: string;
  sortBy: DrinkInfoSortType;
}

interface GetDrinkListResponse {
  sort: Sort;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  pageable: Pageable;
  size: number;
  content: DrinkInfo[];
  empty: boolean;
}

export interface DrinkInfo {
  id: number;
  name: string;
  type: string;
  productName: string;
  alcoholicBeverage: string;
  rawMaterial: string;
  capacity: string;
  manufactureAddress: string;
  region: string;
  price: string;
  image: string;
  latitude: number;
  longitude: number;
  enjoyCount: number;
}

interface Pageable {
  sort: Sort;
  pageNumber: number;
  pageSize: number;
  paged: boolean;
  unpaged: boolean;
  offset: number;
}

interface Sort {
  sorted: boolean;
  unsorted: boolean;
  empty: boolean;
}
export const getDrinkList = async (params: GetDrinkListRequest) => {
  const response = await baseApi.get<GetDrinkListResponse>("api/drinks", {
    params: {
      ...params,
    },
  });
  return response.data;
};

export interface GetHotDrinkResponse {
  drinkId: number;
  name: string;
  manufactureAddress: string;
  image: string;
}
export const getHotDrinkList = async () => {
  const response = await baseApi.get<GetHotDrinkResponse[]>("api/drinks/hot");
  return response.data;
};
