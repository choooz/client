import { SERVER_URL } from "lib/constants";
import { http } from "./http";

interface GetRestaurantRequest {
  voteId: number;
  commentId: number;
  keyword: string;
  areaCode?: number;
  page: number;
}

interface GetRestaurantResponse {
  contentId: string;
  restaurantName: string;
  restaurantImage: string;
  treatMenu: string;
}

export const getRestaurantAPI = async ({
  voteId,
  commentId,
  keyword,
  areaCode,
  page,
}: GetRestaurantRequest) => {
  return await http.get<GetRestaurantResponse>(
    `${SERVER_URL}api/votes/${voteId}/comments/${commentId}/restaurant`,
    {
      params: {
        keyword,
        areaCode,
        page,
      },
    },
  );
};

interface PutRestaurantRequest {
  voteId: number;
  commentId: number;
  restaurantName: string;
  restaurantImage: string;
}

export const putRestaurantAPI = async ({
  voteId,
  commentId,
  restaurantName,
  restaurantImage,
}: PutRestaurantRequest) => {
  return await http.put(`${SERVER_URL}api/votes/${voteId}/comments/${commentId}/restaurant`, {
    restaurantName,
    restaurantImage,
  });
};

interface PutRestaurantRequest {
  voteId: number;
  commentId: number;
  contentId: string;
}

export const getRestaurantImageAPI = async ({
  voteId,
  commentId,
  contentId,
}: PutRestaurantRequest) => {
  return await http.put(
    `${SERVER_URL}api/votes/${voteId}/comments/${commentId}/restaurant/${contentId}`,
  );
};

// export const getRestaurantAPI = async ({
//   voteId,
//   commentId,
//   keyword,
//   areaCode,
//   page,
// }: GetRestaurantRequest) => {
//   const response = await fetch(
//     `${SERVER_URL}api/votes/${voteId}/comments/${commentId}/restaurant`,
//     {
//       body: JSON.stringify({
//         keyword,
//         areaCode,
//         page,
//       }),
//     },
//   );
//   const res = await response.json();
//   return res.data;
// };
