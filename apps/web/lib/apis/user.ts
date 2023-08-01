import { GetUserInfoResponse } from "types/user";
import { CategoryNameType } from "types/vote";
import apiClient from "./apiClient";

interface AddInfoRequest {
  mbti: string;
  age: number;
  gender: string | null;
}

export const addInfoAPI = async (addInfoRequest: AddInfoRequest) => {
  const response = await apiClient.patch("api/user/addInfo", addInfoRequest);
  return response.data;
};
interface AddInterestCategoryRequest {
  categoryList: CategoryNameType[];
}

export const addInterestCategoryAPI = async (
  addInterestCategoryRequest: AddInterestCategoryRequest,
) => {
  const response = await apiClient.patch(
    "api/user/addInterestCategory",
    addInterestCategoryRequest,
  );
  return response.data;
};

export const getUserInfo = async () => {
  const response = await apiClient.get<GetUserInfoResponse>("api/oauth/login");
  return response.data;
};
