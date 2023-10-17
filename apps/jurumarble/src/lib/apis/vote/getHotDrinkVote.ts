import { SERVER_URL } from "lib/env";

interface GetHotDrinkVoteResponse {
  voteId: number;
  voteTitle: string;
  drinkAImage: string;
  drinkBImage: string;
}

export const getHotDrinkVote = async () => {
  const res = await fetch(`${SERVER_URL}api/votes/drinks/hot`);
  const data = await res.json();
  return data as GetHotDrinkVoteResponse;
};
