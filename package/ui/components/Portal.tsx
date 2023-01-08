import { ReactElement, ReactNode, ReactPortal, useEffect, useState } from "react";
import ReactDOM from "react-dom";

interface PortalProps {
  children: ReactNode;
  selector: string;
}

function Portal({ children, selector }: PortalProps): ReactPortal | null {
  const [element, setElement] = useState<Element | null>(null);

  useEffect(() => {
    setElement(document.querySelector(selector));
  }, []);

  if (!element) {
    return null;
  }

  return ReactDOM.createPortal(children, element);
}

export default Portal;
