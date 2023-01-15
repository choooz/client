import apiClient from "./apiClient";

export interface postVoteRequest {
  userId: number;
  title: string;
  detail: string;
  category: string;
  titleA: string;
  titleB: string;
  imageA: string;
  imageB: string;
  filteredGender: string;
  filteredAge: string;
  filteredMbti: string;
}

export const postVoteAPI = async (body: postVoteRequest) => {
  const requestBody = {
    userId: 1,
    title: body.title,
    detail: "NULL",
    category: body.category || "NULL",
    imageA: body.imageA,
    imageB: body.imageB,
    titleA: body.titleA,
    titleB: body.titleB,
    filteredGender: body.filteredGender || "NULL",
    filteredAge: body.filteredAge || "NULL",
    filteredMbti: body.filteredMbti || "NULL",
  };
  const response = await apiClient.post("api/vote/createVote", requestBody);
  return response.data;
};
