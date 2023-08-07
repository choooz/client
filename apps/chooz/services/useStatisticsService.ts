import { useQuery } from "@tanstack/react-query";
import { getStatisticsById, getVoteCountById } from "lib/apis/vote";
import { reactQueryKeys } from "lib/queryKeys";

export default function useStatisticsService(voteId: number) {
  const voteCountQuery = useQuery(reactQueryKeys.detailVoteCount(voteId), () =>
    getVoteCountById(voteId),
  );

  const voteStatisticsQuery = useQuery(reactQueryKeys.detailAnalysis(voteId), () =>
    getStatisticsById(voteId),
  );
  return {
    voteCountQuery,
    voteStatisticsQuery,
  };
}
