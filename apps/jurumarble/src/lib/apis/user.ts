import { GENDER } from "lib/constants";

import { baseApi } from "./http/base";
import { http } from "./http/http";

type GenderType = keyof typeof GENDER;

export interface GetUserInfoResponse {
  nickname: string;
  email: string;
  imageUrl: string;
  yearOfBirth: number;
  gender: GenderType;
  mbti: string;
  alcoholLimit: string;
  userId: number;
}

export const getUserInfoAPI = async () => {
  const response = await http.get<GetUserInfoResponse>("api/users");
  return response.data;
};

interface AddUserInfoRequest {
  mbti: string;
  birthOfAge: number;
  gender: string;
  alcoholLimit: string;
}

export const addUserInfoAPI = async (params: AddUserInfoRequest) => {
  const response = await http.put<AddUserInfoRequest>("api/users/additional-info", params);
  return response.data;
};

interface GetTestUserResponse {
  accessToken: string;
  refreshToken: string;
  newUser: boolean;
}

export const getTestUserAPI = async () => {
  const response = await baseApi.get<GetTestUserResponse>("api/users/test");
  return response.data;
};
