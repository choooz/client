import { useInfiniteQuery } from "@tanstack/react-query";
import { getVoteListAPI } from "lib/apis/vote";
import { reactQueryKeys } from "lib/queryKeys";
import { useEffect, useMemo, useState } from "react";

interface Props {
  size: number;
  sortBy: string;
}

const SafeRange = 5;

export default function useInfiniteMainListService({ size, sortBy }: Props) {
  const [nowShowing, setNowShowing] = useState(0);

  const { data, isLoading, isError, fetchNextPage } = useInfiniteQuery(
    reactQueryKeys.mainVoteList(),
    ({ pageParam = 0 }) => getVoteListAPI({ page: pageParam, size, sortBy }),
    {
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.last) return undefined;
        return pages.length;
      },
      keepPreviousData: true,
      cacheTime: 1000 * 60 * 5,
    },
  );

  const mainVoteList = useMemo(
    () => (data ? data.pages.flatMap((page) => page.content) : []),
    [data],
  );

  const onChangeNowShowing = (index: number) => {
    if (nowShowing + index < 0) return;
    if (nowShowing + index > mainVoteList.length - 1) return;
    setNowShowing((prev) => prev + index);
  };

  useEffect(() => {
    if (nowShowing === mainVoteList.length - SafeRange) fetchNextPage();
  }, [nowShowing, mainVoteList.length]);

  return { data, isLoading, isError, mainVoteList, nowShowing, onChangeNowShowing };
}
