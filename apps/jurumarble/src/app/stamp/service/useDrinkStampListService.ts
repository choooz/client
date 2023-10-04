import { useInfiniteQuery } from "@tanstack/react-query";
import { getEnjoyedDrinkList } from "lib/apis/drink";
import { queryKeys } from "lib/queryKeys";
import { useInfiniteScroll } from "@monorepo/hooks";

type DrinkStampListProps = Exclude<Parameters<typeof getEnjoyedDrinkList>[0], undefined>;

const getDrinkListQueryKey = (params: DrinkStampListProps) => [
  queryKeys.DRINK_STAMP_LIST,
  { ...params },
];

export default function useDrinkStampListService(params: DrinkStampListProps) {
  const { data, fetchNextPage } = useInfiniteQuery(
    getDrinkListQueryKey(params),
    ({ pageParam }) =>
      getEnjoyedDrinkList({
        ...params,
        page: pageParam?.page || params.page,
      }),
    {
      getNextPageParam: ({ last, number }) => {
        if (last) return undefined;
        return {
          page: number + 1,
        };
      },
      keepPreviousData: true,
    },
  );

  const numberOfStampedDrinks = data?.pages[0].numberOfElements ?? 0;

  const drinkList = data?.pages.flatMap((page) => page.content) ?? [];

  const [subscribe] = useInfiniteScroll(fetchNextPage);

  return { drinkList, fetchNextPage, subscribe, numberOfStampedDrinks };
}