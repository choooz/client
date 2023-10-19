/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  getDrinkInfo,
  getIsEnjoyedDrinkAPI,
  postDrinkEnjoyAPI,
} from 'lib/apis/drink';
import { queryKeys } from 'lib/queryKeys';

type PostDrinkStampProps = Exclude<
  Parameters<typeof postDrinkEnjoyAPI>[0],
  undefined
>;
type GetDrinkInfoProps = Exclude<Parameters<typeof getDrinkInfo>[0], undefined>;

const getDrinkStampQueryKey = (params: PostDrinkStampProps) => [
  queryKeys.DRINK_STAMP,
  params,
];

const getDrinkInfoQueryKey = (params: GetDrinkInfoProps) => [
  queryKeys.DRINK_INFO,
  params,
];

const getDrinkStampListQueryKey = [queryKeys.DRINK_STAMP_LIST];

const getDrinkListQueryKey = [queryKeys.SEARCH_DRINK_LIST];

export default function useDrinkStampService(drinkId: PostDrinkStampProps) {
  const { data: isStampedDrink } = useQuery(
    getDrinkStampQueryKey(drinkId),
    () => getIsEnjoyedDrinkAPI(drinkId),
  );

  const queryClient = useQueryClient();
  const { mutate: postDrinkEnjoy } = useMutation(
    (drinkId: PostDrinkStampProps) => postDrinkEnjoyAPI(drinkId),
    {
      async onMutate(drinkId) {
        await queryClient.cancelQueries(getDrinkStampQueryKey(drinkId));
        const previousData = queryClient.getQueryData(
          getDrinkStampQueryKey(drinkId),
        );
        queryClient.setQueryData(getDrinkStampQueryKey(drinkId), (old: any) => [
          old,
          drinkId,
        ]);
        return { previousData };
      },
      onSuccess() {
        queryClient.invalidateQueries(getDrinkListQueryKey);
        queryClient.invalidateQueries(getDrinkInfoQueryKey(drinkId));
        queryClient.invalidateQueries(getDrinkStampListQueryKey);
      },
      onError(err, drinkId, context) {
        queryClient.setQueryData(
          getDrinkStampQueryKey(drinkId),
          context?.previousData,
        );
      },

      onSettled(_, __, drinkId) {
        queryClient.invalidateQueries({
          queryKey: getDrinkStampQueryKey(drinkId),
        });
      },
    },
  );

  return { isStampedDrink, postDrinkEnjoy };
}
