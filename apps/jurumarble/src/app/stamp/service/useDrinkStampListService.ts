import { useInfiniteScroll } from '@monorepo/hooks';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getEnjoyedDrinkList } from 'lib/apis/drink';
import { queryKeys } from 'lib/queryKeys';

type DrinkStampListProps = Exclude<
  Parameters<typeof getEnjoyedDrinkList>[0],
  undefined
>;

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
      getNextPageParam: ({ drinkData }) => {
        const { last, number } = drinkData;
        if (last) {
          return undefined;
        }
        return {
          page: number + 1,
        };
      },
      keepPreviousData: true,
    },
  );

  const enjoyedDrinkCount = data?.pages[0].enjoyedDrinkCount ?? 0;

  const drinkList = data?.pages.flatMap((page) => page.drinkData.content) ?? [];

  const [subscribe] = useInfiniteScroll(fetchNextPage);

  return { drinkList, fetchNextPage, subscribe, enjoyedDrinkCount };
}
