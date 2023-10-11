import { useInfiniteQuery } from "@tanstack/react-query";
import { getRestaurantAPI } from "lib/apis/restaurant";
import { queryKeys } from "lib/queryKeys";
import { useInfiniteScroll } from "@monorepo/hooks";

type GetRestaurantListParams = Exclude<Parameters<typeof getRestaurantAPI>[0], undefined>;

const getRestaurantListQueryKey = (params: GetRestaurantListParams) => [
  queryKeys.RESTAURANT_LIST,
  params,
];

export default function useRestaurantService(params: GetRestaurantListParams) {
  const { data, fetchNextPage } = useInfiniteQuery(
    getRestaurantListQueryKey(params),
    ({ pageParam }) => {
      return getRestaurantAPI({ ...params, page: pageParam?.page || 1 });
    },
    {
      getNextPageParam: ({ last, number }) => {
        if (last) return undefined;
        return {
          page: number + 2,
        };
      },
      keepPreviousData: true,
    },
  );

  const [subscribe] = useInfiniteScroll(fetchNextPage);

  const restaurantList = data?.pages.flatMap((page) => page.content) ?? [];

  return { restaurantList, subscribe };
}
