import { SERVER_URL } from "lib/constants";
import { http } from "./http/http";

type CommentType = "votes" | "drinks";

interface GetRestaurantRequest {
  commentType: CommentType;
  typeId: number;
  commentId: number;
  keyword: string;
  region: string;
  page: number;
}

export interface RestaurantInfo {
  contentId: string;
  restaurantName: string;
  restaurantImage: string;
  treatMenu: string;
}

interface Sort {
  sorted: boolean;
  unsorted: boolean;
  empty: boolean;
}

interface Pageable {
  sort: Sort;
  pageNumber: number;
  pageSize: number;
  offset: number;
  paged: boolean;
  unpaged: boolean;
}

export interface GetRestaurantResponse {
  content: RestaurantInfo[];
  pageable: Pageable;
  sort: Sort;
  first: boolean;
  last: boolean;
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  empty: boolean;
}

export const getRestaurantAPI = async ({
  commentType,
  typeId,
  commentId,
  keyword,
  region,
  page,
}: GetRestaurantRequest) => {
  const response = await http.get<GetRestaurantResponse>(
    `api/${commentType}/${typeId}/comments/${commentId}/restaurant`,
    {
      params: {
        keyword,
        region,
        page,
      },
    },
  );
  return response.data;
};

// export const getRestaurantAPI = async ({
//   typeId,
//   commentId,
//   keyword,
//   region,
//   page,
// }: GetRestaurantRequest) => {
//   const response = await fetch(
//     `${SERVER_URL}api/votes/${typeId}/comments/${commentId}/restaurant?keyword=${keyword}&region=${region}&page=${page}`,
//   );
//   const res = await response.json();
//   return res.data;
// };

interface PutRestaurantRequest {
  typeId: number;
  commentId: number;
  restaurantName: string;
  restaurantImage: string;
}

export const putRestaurantAPI = async ({
  typeId,
  commentId,
  restaurantName,
  restaurantImage,
}: PutRestaurantRequest) => {
  return await http.put(`${SERVER_URL}api/votes/${typeId}/comments/${commentId}/restaurant`, {
    restaurantName,
    restaurantImage,
  });
};

interface GetRestaurantImageRequest {
  commentType: CommentType;
  typeId: number;
  commentId: number;
  contentId: string;
}

type GetRestaurantImageResponse = string[];

export const getRestaurantImageAPI = async ({
  commentType,
  typeId,
  commentId,
  contentId,
}: GetRestaurantImageRequest) => {
  const response = await http.get<GetRestaurantImageResponse>(
    `api/${commentType}/${typeId}/comments/${commentId}/restaurant/${contentId}`,
  );
  return response.data;
};
// export const getRestaurantImageAPI = async ({
//   typeId,
//   commentId,
//   contentId,
// }: GetRestaurantImageRequest) => {
//   return await http.put(
//     `${SERVER_URL}api/votes/${typeId}/comments/${commentId}/restaurant/${contentId}`,
//   );
// };

interface PostRestaurantImageRequest {
  restaurantName: string;
  restaurantImage: string;
  commentType: CommentType;
  typeId: number;
  commentId: number;
}

export const postRestaurantImageAPI = async ({
  restaurantName,
  restaurantImage,
  commentType,
  typeId,
  commentId,
}: PostRestaurantImageRequest) => {
  const response = await http.post<GetRestaurantImageResponse>(
    `api/${commentType}/${typeId}/comments/${commentId}/restaurant`,
    {
      restaurantName,
      restaurantImage,
    },
  );
  return response.data;
};
