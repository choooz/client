import { useIntersectionObserver } from "./useIntersectionObserver";
import { useCallback } from "react";

/**
 * 무한 스크롤에 사용하는 hooks
 *
 * ### 예제
 * ```tsx
 * const [subscribe] = useInfiniteScroll<HTMLDivElement>(onLoadMore, {
 *   rootMargin: '100px',
 * });
 * ...
 * return (
 *   <div ref={subscribe}>
 * ...
 * ```
 */
export function useInfiniteScroll<T extends HTMLElement>(
  onLoadMore: () => unknown,
  options?: IntersectionObserverInit,
) {
  const subscriber = useCallback(
    ([entry]: IntersectionObserverEntry[]) => {
      if (!entry?.isIntersecting) {
        return;
      }
      onLoadMore();
    },
    [onLoadMore],
  );

  return useIntersectionObserver<T>(subscriber, options);
}
