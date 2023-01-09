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
  gender: string;
  age: string;
  mbti: string;
}

export const postVoteAPI = async (body: postVoteRequest) => {
  const requestBody = {
    userId: 1,
    title: body.title,
    detail: body.detail,
    category: body.category || "NULL",
    imageA: body.imageA,
    imageB: body.imageB,
    titleA: body.titleA,
    titleB: body.titleB,
    gender: body.gender || "NULL",
    age: body.age || "NULL",
    mbti: body.mbti || "NULL",
  };
  console.log(requestBody);
  const response = await apiClient.post("api/vote/createVote", requestBody);
  return response.data;
};
