import { useState } from 'react';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AorB, getVotingCheck, postExecuteVote } from 'lib/apis/vote';
import { queryKeys, reactQueryKeys } from 'lib/queryKeys';

const getMyParticipateVotedQueryKey = [queryKeys.MY_PARTICIPATED_VOTE];

export default function useExecuteVoteService(voteId: number) {
  const [select, setSelect] = useState<{ choice: AorB | null }>({
    choice: null,
  });
  const queryClient = useQueryClient();
  const { mutate } = useMutation(
    (choice: 'A' | 'B') => postExecuteVote(voteId, { choice }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries([queryKeys.VOTE_DETAIL]);
        queryClient.invalidateQueries([queryKeys.VOTING_CHECK]);
        queryClient.invalidateQueries([queryKeys.DETAIL_FILTERED_ANALYSIS]);
        queryClient.invalidateQueries(getMyParticipateVotedQueryKey);
      },
    },
  );

  const { data } = useQuery(
    reactQueryKeys.votingCheck(voteId),
    () => getVotingCheck(voteId),
    {
      onSuccess: (data) => {
        if (data.voted) {
          setSelect({ choice: data.userChoice });
        } else {
          setSelect({ choice: null });
        }
      },
      onError: () => {
        setSelect({ choice: null });
      },
      enabled: !!voteId,
      // @note 캐시를 사용하지 않는다.
      cacheTime: 0,
      staleTime: 0,
    },
  );

  return { mutate, select, data };
}
