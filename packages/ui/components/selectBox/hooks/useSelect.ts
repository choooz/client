import { useState } from "react";
import { useToggle } from "@chooz/hooks";

export default function useSelect(defaultOption: string) {
  const [isOpen, onChangeOpen] = useToggle();
  const [option, setOption] = useState(defaultOption);
  const onChangeOption = (value: string) => {
    setOption(value);
    onChangeOpen();
  };

  return { isOpen, onChangeOpen, option, onChangeOption };
}
