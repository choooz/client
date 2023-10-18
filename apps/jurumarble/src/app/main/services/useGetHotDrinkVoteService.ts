import { useQuery } from '@tanstack/react-query';
import { getHotDrinkVote } from 'lib/apis/vote/getHotDrinkVote';

import { hotDrinkVoteQueryKey } from './queryKey';

export const useGetHotDrinkVoteService = () => {
  const { data: hotDrinkVote } = useQuery({
    queryKey: [hotDrinkVoteQueryKey],
    queryFn: getHotDrinkVote,
  });
  return { hotDrinkVote };
};
