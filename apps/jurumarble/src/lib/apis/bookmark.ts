import { http } from "./http";

export const postBookmarkAPI = async (voteId: number) => {
  const response = await http.post(`api/votes/${voteId}/bookmark`, { voteId });
  return response.data;
};

interface GetBookmarkResponse {
  bookmarked: boolean;
}

export const getBookMarkCheckAPI = async (voteId: number) => {
  const response = await http.get<GetBookmarkResponse>(`api/votes/${voteId}/bookmark`);
  return response.data;
};
