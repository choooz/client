import { httpFetch } from 'src/modules/httpFetch';

interface GetHotDrinkVoteResponse {
  voteId: number;
  voteTitle: string;
  drinkAImage: string;
  drinkBImage: string;
}

export const getHotDrinkVote = async () => {
  const res = await httpFetch(`api/votes/drinks/hot`, {
    next: {
      revalidate: 60 * 60, // 1시간
    },
  });
  const data = await res.json();
  return data as GetHotDrinkVoteResponse;
};
