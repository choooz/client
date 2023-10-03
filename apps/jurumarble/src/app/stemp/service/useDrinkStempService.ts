import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getIsEnjoyedDrinkAPI, postDrinkEnjoyAPI } from "lib/apis/drink";
import { queryKeys } from "lib/queryKeys";

type PostDrinkStempProps = Exclude<Parameters<typeof postDrinkEnjoyAPI>[0], undefined>;
const getDrinkStempQueryKey = (params: PostDrinkStempProps) => [queryKeys.DRINK_STEMP, params];

export default function useDrinkStempService(drinkId: PostDrinkStempProps) {
  const { data: isStempedDrink } = useQuery(getDrinkStempQueryKey(drinkId), () =>
    getIsEnjoyedDrinkAPI(drinkId),
  );

  const queryClient = useQueryClient();
  const { mutate: postDrinkEnjoy } = useMutation(
    (drinkId: PostDrinkStempProps) => postDrinkEnjoyAPI(drinkId),
    {
      async onMutate(drinkId) {
        await queryClient.cancelQueries(getDrinkStempQueryKey(drinkId));
        const previousData = queryClient.getQueryData(getDrinkStempQueryKey(drinkId));
        queryClient.setQueryData(getDrinkStempQueryKey(drinkId), (old: any) => [old, drinkId]);
        return { previousData };
      },
      onError(err, drinkId, context) {
        queryClient.setQueryData(getDrinkStempQueryKey(drinkId), context?.previousData);
      },

      onSettled(_, __, drinkId) {
        queryClient.invalidateQueries({ queryKey: getDrinkStempQueryKey(drinkId) });
      },
    },
  );

  return { isStempedDrink, postDrinkEnjoy };
}
