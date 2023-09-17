import { useQuery } from "@tanstack/react-query";
import { getVoteByVoteIdAPI } from "lib/apis/vote";

import { reactQueryKeys } from "lib/queryKeys";

export default function useVoteLoadService(voteId: number) {
  const { data, isLoading, isError } = useQuery(
    reactQueryKeys.voteDetail(voteId),
    () => getVoteByVoteIdAPI(voteId),
    {
      enabled: !!voteId,
    },
  );

  return { data, isLoading, isError };
}
