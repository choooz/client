import apiClient from "./apiClient";

interface PostVotingRequest {
  choice: "A";
}

export const postVotingById = async (voteId: number, body: PostVotingRequest) => {
  const response = await apiClient.post(`api/votes/${voteId}/vote`, body);
  return response.data;
};
