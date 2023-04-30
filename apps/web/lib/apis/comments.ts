import axios from "axios";
import { SERVER_URL } from "lib/constants";
import { CommentFilter } from "types/comments";
import apiClient from "./apiClient";

export interface GetCommentRequest {
  age: string;
  mbti: string;
  gender: string;
  sortBy: string;
  page: 0;
  size: 0;
}

interface CommentResponse {
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

export interface GetCommentResponse {
  content: CommentResponse[];
  empty: boolean;
  first: boolean;
  last: boolean;
  numberOfElements: number;
  size: number;
}

export const getCommentById = async (voteId: number, filter: CommentFilter, page: number) => {
  const { age, gender, mbti, sortBy } = filter;
  console.log(page);
  const response = await axios.get<GetCommentResponse>(
    `${SERVER_URL}api/votes/${voteId}/comments`,
    {
      params: {
        age,
        mbti,
        gender,
        sortBy,
        page,
        size: 5,
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
  const response = await apiClient.post(`api/votes/${voteId}/comments`, body);
  return response.data;
};

export const deleteComment = async (commentId: number, voteId: number) => {
  const response = await apiClient.delete(`api/votes/${voteId}/comments/${commentId}`);
  return response.data;
};

export const likeComment = async (commentId: number, voteId: number) => {
  const response = await apiClient.post(`api/votes/${voteId}/comments/${commentId}/likers`);
  return response.data;
};

export const hateComment = async (commentId: number, voteId: number) => {
  const response = await apiClient.post(`api/votes/${voteId}/comments/${commentId}/haters`);
  return response.data;
};
