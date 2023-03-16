import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getVotingCheck, postVotingById } from "lib/apis/voting";
import { queryKeys, reactQueryKeys } from "lib/queryKeys";

import { useState } from "react";
import { AorB, Voting } from "types/vote";

export default function useMutateVotingService(voteId: number) {
  const queryClient = useQueryClient();
  const [select, setSelect] = useState<Voting>({ choice: null });

  const { mutate } = useMutation((choice: AorB) => postVotingById(voteId, { choice }), {
    onSuccess: () => {
      queryClient.invalidateQueries([queryKeys.VOTING_CHECK]);
    },
  });

  const onMutateVoting = (select: AorB) => {
    setSelect({ choice: select });
    mutate(select);
  };

  const { data } = useQuery(reactQueryKeys.votingCheck(voteId), () => getVotingCheck(voteId), {
    onSuccess: (data) => {
      if (data.voted) {
        setSelect({ choice: data.userChoice });
      } else setSelect({ choice: null });
    },
    // @note 캐시를 사용하지 않는다.
    cacheTime: 0,
    staleTime: 0,
  });

  return { mutate, onMutateVoting, select, data };
}
