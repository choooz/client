import axios from "axios";
import { SERVER_URL } from "lib/constants";
import apiClient from "./apiClient";

export interface GetCommentRequest {
  age: string;
  mbti: string;
  gender: string;
  sortBy: string;
  page: 0;
  size: 0;
}

export interface GetCommentResponse {
  id: number;
  userId: number;
  parentId: number | null;
  content: string;
  gender: string;
  imageUrl: string;
  age: string;
  mbti: string;
  nickName: string;
  createdDate: string;
  likeCount: number;
  hateCount: number;
}

export const getCommentById = async (voteId: number) => {
  const response = await apiClient.get<GetCommentResponse[]>(
    `${SERVER_URL}api/votes/${voteId}/comments`,
    {
      params: {
        age: "",
        mbti: "",
        gender: "",
        sortBy: "ByTime",
        page: 0,
        size: 20,
      },
    },
  );
  return response.data;
};

export interface PostCommnetRequest {
  content: string;
  parentId?: number | null;
}

export const postComment = async (body: PostCommnetRequest, voteId: number) => {
  const response = await apiClient.post(`${SERVER_URL}api/votes/${voteId}/comments`, body);
  return response.data;
};
