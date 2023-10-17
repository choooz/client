/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getIsEnjoyedDrinkAPI, postDrinkEnjoyAPI } from "lib/apis/drink";
import { queryKeys } from "lib/queryKeys";

type PostDrinkStampProps = Exclude<Parameters<typeof postDrinkEnjoyAPI>[0], undefined>;
const getDrinkStampQueryKey = (params: PostDrinkStampProps) => [queryKeys.DRINK_STAMP, params];

export default function useDrinkStampService(drinkId: PostDrinkStampProps) {
  const { data: isStampedDrink } = useQuery(getDrinkStampQueryKey(drinkId), () =>
    getIsEnjoyedDrinkAPI(drinkId),
  );

  const queryClient = useQueryClient();
  const { mutate: postDrinkEnjoy } = useMutation(
    (drinkId: PostDrinkStampProps) => postDrinkEnjoyAPI(drinkId),
    {
      async onMutate(drinkId) {
        await queryClient.cancelQueries(getDrinkStampQueryKey(drinkId));
        const previousData = queryClient.getQueryData(getDrinkStampQueryKey(drinkId));
        queryClient.setQueryData(getDrinkStampQueryKey(drinkId), (old: any) => [old, drinkId]);
        return { previousData };
      },
      onError(err, drinkId, context) {
        queryClient.setQueryData(getDrinkStampQueryKey(drinkId), context?.previousData);
      },

      onSettled(_, __, drinkId) {
        queryClient.invalidateQueries({ queryKey: getDrinkStampQueryKey(drinkId) });
      },
    },
  );

  return { isStampedDrink, postDrinkEnjoy };
}
