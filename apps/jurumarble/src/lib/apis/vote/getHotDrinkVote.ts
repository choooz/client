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
      revalidate: 30 * 60, // 30분
    },
  });
  const data = await res.json();
  return data as GetHotDrinkVoteResponse;
};
