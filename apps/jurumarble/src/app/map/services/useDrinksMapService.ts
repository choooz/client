import { useInfiniteQuery } from "@tanstack/react-query";
import { useInfiniteScroll } from "@monorepo/hooks";
import { reactQueryKeys } from "lib/queryKeys";
import { getDrinksMap } from "lib/apis/drink";

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
        if (last) return undefined;
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
