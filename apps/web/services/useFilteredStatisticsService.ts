import { useQuery } from "@tanstack/react-query";
import { getFilterdStatisticsById, getStatisticsById, getVoteCountById } from "lib/apis/vote";
import { reactQueryKeys } from "lib/queryKeys";

export default function useFilteredStatisticsService(
  voteId: number,
  gender: string | null,
  mbti: string | null,
  age: string | null,
) {
  const voteStatisticsQuery = useQuery(
    reactQueryKeys.detailFilterdAnalysis(voteId, gender || "", mbti || "", age || ""),
    () => getFilterdStatisticsById(voteId, gender || "", mbti || "", age || ""),
    {
      enabled: !!voteId,
    },
  );
  return {
    voteStatisticsQuery,
  };
}
