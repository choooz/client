import { useCallback, useEffect, useRef } from "react";

/** ref이외의 공간을 클릭할시 onClose함수를 실행시키는 함수 */
export default function useOutsideClick<T extends HTMLElement>(
  isOpen: boolean,
  onClose: () => void,
) {
  const targetEl = useRef<T>(null);

  const onClickOutSide = useCallback(
    (e: MouseEvent) => {
      const { target } = e;
      if (target instanceof Node) {
        if (isOpen && !targetEl.current?.contains(target)) {
          onClose();
        }
      }
    },
    [isOpen, onClose],
  );

  useEffect(() => {
    window.addEventListener("click", onClickOutSide);
    return () => {
      window.removeEventListener("click", onClickOutSide);
    };
  }, [onClickOutSide]);

  return {
    targetEl,
  };
}
