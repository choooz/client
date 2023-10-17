import { useInfiniteScroll } from "@monorepo/hooks";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getDrinksMap } from "lib/apis/drink";
import { reactQueryKeys } from "lib/queryKeys";

export default function useDrinksMapService(params: {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  page: number;
  size: number;
}) {
  const { startX, startY, endX, endY, page, size } = params;
  const { data, fetchNextPage } = useInfiniteQuery(
    reactQueryKeys.drinksMap(startX, startY, endX, endY, page, size),
    ({ pageParam }) => getDrinksMap({ ...params, page: pageParam?.page || 0 }),
    {
      getNextPageParam: ({ last, number }) => {
        if (last) {return undefined;}
        return {
          page: number + 1,
        };
      },
      keepPreviousData: true,
    },
  );

  const [subscribe] = useInfiniteScroll(fetchNextPage);

  const drinksList = data?.pages.flatMap((page) => page.content) ?? [];

  return { drinksList, subscribe };
}
