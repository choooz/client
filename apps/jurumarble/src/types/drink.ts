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
  enjoyCount: number | null;
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
