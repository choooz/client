import { SERVER_URL } from "lib/constants";
import { GetUserInfoResponse } from "types/user";
import apiClient from "./apiClient";

interface AddInfoRequest {
  mbti: string;
  age: number;
  gender: string | null;
}

export const addInfoAPI = async (addInfoRequest: AddInfoRequest) => {
  const response = await apiClient.patch(`${SERVER_URL}api/user/addInfo`, addInfoRequest);
  return response.data;
};

interface AddInterestCategoryRequest {
  userId: number;
  // @todo category 타입만 받을 수 있는 배열을 사용하고 싶다.
  categoryLists: string[];
}

export const addInterestCategoryAPI = async (
  addInterestCategoryRequest: AddInterestCategoryRequest,
) => {
  const response = await apiClient.patch(
    `${SERVER_URL}api/user/addInterestCategory`,
    addInterestCategoryRequest,
  );
  return response.data;
};

export const getUserInfo = async () => {
  const response = await apiClient.get<GetUserInfoResponse>(`${SERVER_URL}api/oauth/login`);
  return response.data;
};
