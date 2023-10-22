import { useEffect, useMemo } from 'react';

import { useInfiniteQuery } from '@tanstack/react-query';
import { getVoteListAPI } from 'lib/apis/vote';
import { reactQueryKeys } from 'lib/queryKeys';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'react-toastify';
import { VoteSortType } from 'src/types/common';

interface Props {
  size: number;
  sortBy: VoteSortType;
  keyword?: string;
}

const SafeRange = 5;

export default function useInfiniteMainListService({
  size,
  sortBy,
  keyword,
}: Props) {
  const searchParams = useSearchParams();
  const voteId = searchParams.get('voteId');
  const { push } = useRouter();
  const pathname = usePathname();

  const { data, isLoading, isError, fetchNextPage } = useInfiniteQuery(
    reactQueryKeys.mainVoteList(),
    ({ pageParam = 0 }) =>
      getVoteListAPI({ page: pageParam, size, sortBy, keyword }),
    {
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.last) {
          return undefined;
        }
        return pages.length;
      },
      keepPreviousData: true,
      staleTime: 0,
      cacheTime: 0,
    },
  );

  const datas = data?.pages.flatMap((page) => page.content) ?? [];

  const getByIndex = (voteId: number) => {
    if (!datas.length) {
      return 0;
    }
    return datas?.findIndex((data) => data.voteId === voteId) > -1
      ? datas?.findIndex((data) => data.voteId === voteId)
      : 0;
  };

  const nowShowing = getByIndex(Number(voteId));

  const mainVoteList = useMemo(
    () => (data ? data.pages.flatMap((page) => page.content) : []),
    [data],
  );

  const onChangeNowShowing = (index: number) => {
    if (nowShowing + index < 0) {
      toast.warning('가장 최근 투표예요', {
        toastId: 'voteError',
      });
      return;
    }
    if (nowShowing + index > mainVoteList.length - 1) {
      return;
    }
    push(`${pathname}?voteId=${mainVoteList[nowShowing + index].voteId}`);
  };

  useEffect(() => {
    if (nowShowing === mainVoteList.length - SafeRange) {
      fetchNextPage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nowShowing, mainVoteList.length]);

  return {
    data,
    isError,
    isLoading,
    mainVoteList,
    nowShowing,
    onChangeNowShowing,
  };
}
