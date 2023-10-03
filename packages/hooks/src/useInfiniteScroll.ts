import { useCallback } from "react";
import useIntersectionObserver from "./useIntersectionObserver";

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
export default function useInfiniteScroll<T extends HTMLElement>(
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
