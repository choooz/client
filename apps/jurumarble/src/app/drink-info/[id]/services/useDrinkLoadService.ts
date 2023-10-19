import { useQuery } from '@tanstack/react-query';
import { getDrinkInfo } from 'lib/apis/drink';
import { queryKeys } from 'lib/queryKeys';

type GetDrinkInfoProps = Exclude<Parameters<typeof getDrinkInfo>[0], undefined>;

const getQueryKey = (params: GetDrinkInfoProps) => [
  queryKeys.DRINK_INFO,
  params,
];

export default function useDrinkLoadService(id: GetDrinkInfoProps) {
  const { data, isLoading, isError } = useQuery(
    getQueryKey(id),
    () => getDrinkInfo(id),
    {
      enabled: !!id,
    },
  );

  return { data, isLoading, isError };
}
