import { useCallback } from "react";

import { ReadonlyURLSearchParams } from "next/navigation";

export function useCreateQueryString(searchParams: ReadonlyURLSearchParams) {
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      /** 
       * @NOTE 추후 필요시 사용
      for (const [key, value] of Object.entries(params)) {
        if (value === null) {
          params.delete(key)
        } else {
          params.set(key, String(value))
        }
      }
      */
      params.set(name, value);
      return params.toString();
    },
    [searchParams],
  );
  return createQueryString;
}
