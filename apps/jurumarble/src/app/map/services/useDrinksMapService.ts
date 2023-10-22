import { useEffect, useMemo, useState } from 'react';

import { useInfiniteScroll } from '@monorepo/hooks';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getDrinksMap } from 'lib/apis/drink';
import { reactQueryKeys } from 'lib/queryKeys';
import { DrinkMapInfo } from 'src/types/drink';

type MapDrinkMarker = DrinkMapInfo & { isOpen: boolean };

export default function useDrinksMapService(params: {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  page: number;
  size: number;
}) {
  const [drinkMarkerList, setDrinkMarkerList] = useState<MapDrinkMarker[]>([]);

  const onClickDrinkMarker = (id: number) => {
    setDrinkMarkerList((prev) => {
      return prev.map((drink) => {
        if (drink.drinkId === id) {
          return {
            ...drink,
            isOpen: !drink.isOpen,
          };
        }
        return {
          ...drink,
          isOpen: false,
        };
      });
    });
  };

  const { startX, startY, endX, endY, page, size } = params;
  const { data, fetchNextPage } = useInfiniteQuery(
    reactQueryKeys.drinksMap(startX, startY, endX, endY, page, size),
    ({ pageParam }) => getDrinksMap({ ...params, page: pageParam?.page || 0 }),
    {
      getNextPageParam: ({ last, number }) => {
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

  const [subscribe] = useInfiniteScroll(fetchNextPage);

  const drinksList = useMemo(() => {
    return data?.pages.flatMap((page) => page.content) ?? [];
  }, [data?.pages]);

  useEffect(() => {
    if (!drinksList) {
      return;
    }

    const drinkMarkerList = drinksList.map((drink) => ({
      ...drink,
      isOpen: false,
    }));

    setDrinkMarkerList(drinkMarkerList);
  }, [drinksList]);

  return { drinkMarkerList, subscribe, onClickDrinkMarker };
}
