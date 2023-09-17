import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { AorB, getVotingCheck, postExecuteVote } from "lib/apis/vote";

import { queryKeys, reactQueryKeys } from "lib/queryKeys";
import { useState } from "react";

export default function useExecuteVoteService(voteId: number) {
  const [select, setSelect] = useState<{ choice: AorB | null }>({ choice: null });
  const queryClient = useQueryClient();
  const { mutate } = useMutation((choice: "A" | "B") => postExecuteVote(voteId, { choice }), {
    onSuccess: () => {
      queryClient.invalidateQueries([queryKeys.VOTE_DETAIL]);
      queryClient.invalidateQueries([queryKeys.VOTING_CHECK]);
    },
    onError: () => {
      alert("로그인 후 진행해주세요.");
    },
  });

  const { data } = useQuery(reactQueryKeys.votingCheck(voteId), () => getVotingCheck(voteId), {
    onSuccess: (data) => {
      if (data.voted) {
        setSelect({ choice: data.userChoice });
      } else setSelect({ choice: null });
    },
    onError: () => {
      setSelect({ choice: null });
    },
    enabled: !!voteId,
    // @note 캐시를 사용하지 않는다.
    cacheTime: 0,
    staleTime: 0,
  });

  return { mutate, select, data };
}
