import { useQuery } from '@tanstack/react-query';
import { getTheNumberOfMyVoteAPI } from 'lib/apis/my';
import { queryKeys } from 'lib/queryKeys';

const getTheNumberOfMyVoteQueryKey = () => [queryKeys.THE_NUMBER_OF_MY_VOTE];

export default function useGetTheNumberOfMyVoteService() {
  const { data: theNumberOfMyVote } = useQuery(
    getTheNumberOfMyVoteQueryKey(),
    getTheNumberOfMyVoteAPI,
  );

  return theNumberOfMyVote;
}
