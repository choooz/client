import axios from "axios";
import { DATA_GO_API_KEY } from "lib/constants";
import { DrinkInfoSortType } from "src/types/common";
import { DrinkListResponse, DrinkMapResponse } from "src/types/drink";
import { baseApi } from "./http/base";
import { http } from "./http/http";

export interface GetDrinkListRequest {
  page: number;
  size: number;
  keyword?: string;
  region?: string;
  sortBy: DrinkInfoSortType;
}

interface GetDrinkListResponse extends DrinkListResponse {}

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

interface GetEnjoyedDrinkListRequest {
  page: number;
  size: number;
  region?: string;
}

export interface GetEnjoyedDrinkListResponse extends DrinkListResponse {}

export const getEnjoyedDrinkList = async (params: GetEnjoyedDrinkListRequest) => {
  const response = await http.get<GetEnjoyedDrinkListResponse>("api/drinks/enjoys", {
    params: {
      ...params,
    },
  });
  return response.data;
};

export interface GetIsEnjoyedDrinkAPIResponse {
  enjoyed: boolean;
}

export const getIsEnjoyedDrinkAPI = async (drinkId: number) => {
  const response = await http.get<GetIsEnjoyedDrinkAPIResponse>(`api/drinks/${drinkId}/enjoy`);
  return response.data;
};

export const postDrinkEnjoyAPI = async (drinkId: number) => {
  const response = await http.post(`api/drinks/enjoys`, {
    drinkId,
  });
  return response.data;
};

export interface GetDrinksMapRequest {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  page: number;
  size: number;
}

export const getDrinksMap = async (params: GetDrinksMapRequest) => {
  const response = await baseApi.get<DrinkMapResponse>("api/drinks/map", {
    params: {
      ...params,
    },
  });
  return response.data;
};

export interface GetDrinkInfoResponse {
  drinkId: number;
  name: string;
  type: string;
  manufacturer: string;
  alcoholicBeverage: string;
  rawMaterial: string;
  capacity: string;
  manufactureAddress: string;
  image: string;
  price: string;
  enjoyCount: number;
}

export const getDrinkInfo = async (drinkId: number) => {
  const response = await baseApi.get<GetDrinkInfoResponse>(`api/drinks/${drinkId}`);
  return response.data;
};

interface GetDrinkRecommendationListRequest {
  page: number;
  perPage: number;
  returnType?: "json" | "xml";
}

interface GetDrinkRecommendationListResponse {
  currentCount: number;
  data: Data[];
  matchCount: number;
  page: number;
  perPage: number;
  totalCount: number;
}

interface Data {
  규격: string;
  도수: string;
  전통주명: string;
  제조사: string;
  주원료: string;
}

export const getDrinkRecommendationListAPI = async (params: GetDrinkRecommendationListRequest) => {
  const response = await axios.get<GetDrinkRecommendationListResponse>(
    "https://api.odcloud.kr/api/15048755/v1/uddi:fec53d3a-2bef-4494-b50e-f4e566f403e0",
    {
      params: {
        ...params,
        serviceKey: DATA_GO_API_KEY,
      },
    },
  );
  return response.data;
};
