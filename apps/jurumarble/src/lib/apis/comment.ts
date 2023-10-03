import { baseApi } from "./http/base";
import { http } from "./http/http";
import { AorB } from "./vote";

export interface PagingRequest {
  page: number;
  size: number;
}

export interface GetCommentRequest {
  sortBy: "ByTime" | "ByPopularity";
  paging: PagingRequest;
  commentType: "votes" | "drinks";
  typeId: number;
}

export interface CommentResponse {
  id: number;
  userId: number;
  voteId: number;
  drinkId: number;
  nickName: string;
  parentId: number;
  content: string;
  imageUrlstring: string;
  gender: string;
  age: string;
  mbti: string;
  createdDate: string;
  likeCount: number;
  hateCount: number;
  choice: AorB;
  restaurant: {
    restaurantName: string;
    restaurantImage: string;
  };
}

export interface GetCommentResponse {
  content: CommentResponse[];
  empty: boolean;
  first: boolean;
  last: boolean;
  numberOfElements: number;
  size: number;
}

export const getCommentById = async ({
  commentType,
  paging,
  sortBy,
  typeId,
}: GetCommentRequest) => {
  const response = await baseApi.get<GetCommentResponse>(`api/${commentType}/${typeId}/comments`, {
    params: {
      sortBy,
      page: paging.page,
      size: paging.size,
    },
  });
  return response.data;
};

export const postLikeComment = async (
  commentType: "votes" | "drinks",
  typeId: number,
  commentId: number,
) => {
  const response = await http.post(`/api/${commentType}/${typeId}/comments/${commentId}/likers`);
  return response.data;
};

export const postHateComment = async (
  commentType: "votes" | "drinks",
  typeId: number,
  commentId: number,
) => {
  const response = await http.post(`/api/${commentType}/${typeId}/comments/${commentId}/haters`);
  return response.data;
};

export interface PostCommentRequest {
  content: string;
  parentId?: number | null;
}

export const postComment = async (
  commentType: "votes" | "drinks",
  voteId: number,
  body: PostCommentRequest,
) => {
  const response = await http.post(`/api/${commentType}/${voteId}/comments/create`, body);
  return response.data;
};
