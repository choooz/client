import { useQuery } from '@tanstack/react-query';
import { getFilterStatisticsById } from 'lib/apis/statistics';
import { reactQueryKeys } from 'lib/queryKeys';

export default function useFilteredStatisticsService(
  voteId: number,
  gender?: string,
  mbti?: string,
  age?: string,
  alcoholLimit?: string,
) {
  const voteStatisticsQuery = useQuery(
    reactQueryKeys.detailFilterdAnalysis(
      voteId,
      gender,
      mbti,
      age,
      alcoholLimit,
    ),
    () => getFilterStatisticsById(voteId, gender, mbti, age, alcoholLimit),
    {
      enabled: !!voteId,
    },
  );
  return {
    voteStatisticsQuery,
  };
}
