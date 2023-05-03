import { useCallback, useEffect } from "react";

interface Props {
  func: () => void;
  delay: number;
  deps: any[];
}

export default function useDebounce({ func, delay, deps }: Props) {
  const callback = useCallback(func, deps);

  useEffect(() => {
    const timer = setTimeout(() => callback(), delay);
    return () => clearTimeout(timer);
  }, [callback, delay]);
}
