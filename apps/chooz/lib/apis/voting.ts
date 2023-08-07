import { AorB } from "types/vote";
import apiClient from "./apiClient";

interface PostVotingRequest {
  choice: AorB | null;
}

export const postVotingById = async (voteId: number, body: PostVotingRequest) => {
  if (body.choice === null) throw new Error("A와 B중 하나를 선택해주세요.");
  const response = await apiClient.post(`api/votes/${voteId}/vote`, body);
  return response.data;
};

interface GetVotingCheckResponse {
  userChoice: AorB | null;
  voted: boolean;
}

export const getVotingCheck = async (voteId: number) => {
  const response = await apiClient.get<GetVotingCheckResponse>(`api/votes/${voteId}/voted`);
  return response.data;
};
