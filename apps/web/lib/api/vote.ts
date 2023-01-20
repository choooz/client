import apiClient from "./apiClient";

export interface PostVoteRequest {
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

export const postVoteAPI = async (body: PostVoteRequest) => {
  const requestBody = {
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

export type modifyVoteRequest = Partial<PostVoteRequest>;

export const modifyVoteAPI = async (body: modifyVoteRequest) => {
  const requestBody = {
    title: body.title || "NULL",
    detail: body.detail,
    category: body.category || "NULL",
    titleA: body.titleA,
    titleB: body.titleB,
  };
  const response = await apiClient.post("api/vote/updateVote", requestBody);
  return response.data;
};
