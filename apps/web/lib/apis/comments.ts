import axios from "axios";
import { SERVER_URL } from "lib/constants";
import apiClient from "./apiClient";

export interface CommentRequest {
  age: string;
  mbti: string;
  gender: string;
  sortBy: string;
  page: 0;
  size: 0;
}

export interface CommentResponse {
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
  const response = await apiClient.get<CommentResponse[]>(
    `${SERVER_URL}api/votes/${voteId}/comments`,
    {
      params: {
        age: "",
        mbti: "",
        gender: "",
        sortBy: "ByTime",
        page: 0,
        size: 5,
      },
    },
  );
  return response.data;
};
