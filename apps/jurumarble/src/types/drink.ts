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

export interface DrinkInfo {
  id: number;
  name: string;
  type: string;
  manufacturer: string;
  alcoholicBeverage: string;
  rawMaterial: string;
  capacity: string;
  manufactureAddress: string;
  region: string;
  price: string;
  image: string;
  latitude: number;
  longitude: number;
  enjoyCount: number | null;
}

export type DrinkInfoType = Pick<DrinkInfo, "id" | "name" | "image">;

export interface DrinkMapInfo {
  drinkId: number;
  name: string;
  region: string;
  latitude: number;
  longitude: number;
  manufacturer: string;
  image: string;
}

export interface DrinkListResponse {
  content: DrinkInfo[];
  pageable: Pageable;
  sort: Sort;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  size: number;
  empty: boolean;
}

export interface DrinkMapResponse {
  content: DrinkMapInfo[];
  pageable: Pageable;
  sort: Sort;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  size: number;
  empty: boolean;
}
