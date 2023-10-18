import { useQuery } from '@tanstack/react-query';
import { getDrinkRecommendationListAPI } from 'lib/apis/drink';
import { queryKeys } from 'lib/queryKeys';

type GetDrinkRecommendationListProps = Exclude<
  Parameters<typeof getDrinkRecommendationListAPI>[0],
  undefined
>;

const getDrinkRecommendationListQueryKey = (
  params: GetDrinkRecommendationListProps,
) => [queryKeys.TODAY_DRINK_RECOMMENDATION, { ...params }];

export default function useGetDrinkRecommendationListService(
  params: GetDrinkRecommendationListProps,
) {
  const { data } = useQuery(getDrinkRecommendationListQueryKey(params), () =>
    getDrinkRecommendationListAPI(params),
  );
  return data?.data;
}
