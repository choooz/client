import { SERVER_URL } from "lib/constants";

interface Writer {
  userImage: string | null;
  userGender: string;
  userAge: number;
  userMbti: string;
  nickName: string;
}

export interface GetVoteByIdResponse {
  writer: Writer;
  voteCreatedDate: Date;
  title: string;
  imageA: string;
  imageB: string;
  titleA: string;
  titleB: string;
  description: string;
}

export const getVoteByVoteIdAPI = async (voteId: number) => {
  const response = await fetch(`${SERVER_URL}api/votes/${voteId}`, {});
  const voteInfo = await response.json();
  return voteInfo.data;
};

interface ModifyVoteRequest {
  title: string;
  detail: string;
  titleA: string;
  titleB: string;
}

export const modifyVoteAPI = async (newVoteInfo: ModifyVoteRequest, voteId: number) => {
  const response = await fetch(`${SERVER_URL}api/votes/${voteId}`, {
    method: "PUT",
    body: JSON.stringify({
      newVoteInfo,
    }),
  });
  const voteInfo = await response.json();
  return voteInfo.data;
};

export interface PostVoteRequest {
  title: string;
  titleA: string;
  titleB: string;
  imageA: string;
  imageB: string;
  drinkAId: string;
  drinkBId: string;
}

export interface PostNormalVoteRequest {
  title: string;
  titleA: string;
  titleB: string;
  imageA: string;
  imageB: string;
}

export const postNormalVoteAPI = async (voteInfo: PostNormalVoteRequest) => {
  const response = await fetch(`${SERVER_URL}api/votes/normal`, {
    method: "POST",
    body: JSON.stringify({
      voteInfo,
    }),
  });
  const res = await response.json();
  return res.data;
};

export interface PostDrinkVoteRequest {
  title: string;
  drinkAId: string;
  drinkBId: string;
}

export const postDrinkVoteAPI = async (voteInfo: PostDrinkVoteRequest) => {
  const response = await fetch(`${SERVER_URL}api/votes/drink`, {
    method: "POST",
    body: JSON.stringify({
      voteInfo,
    }),
  });
  const res = await response.json();
  return res.data;
};
