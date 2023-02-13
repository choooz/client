import { useCallback, useState } from "react";

type ReturnTypes = [boolean, () => void];

export default function useToggle(initialValue = false): ReturnTypes {
  const [value, setValue] = useState(initialValue);

  const onToggle = useCallback(() => {
    setValue(!value);
  }, [value]);

  return [value, onToggle];
}
