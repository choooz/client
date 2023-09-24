import { useContext } from "react";
import { RegisterContext } from "./RegisterProvider";

export const useRegisterContext = () => {
  const context = useContext(RegisterContext);

  if (!context) {
    throw new Error("useRegisterContext는 RegisterProvider 내부에서만 사용할 수 있습니다.");
  }

  return context;
};
