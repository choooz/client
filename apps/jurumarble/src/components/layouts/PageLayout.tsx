import { getClassNames } from "lib/styles/getClassNames";
import { PropsWithChildren } from "react";
import styles from "./styles.module.css";

const cx = getClassNames(styles);

export const PageLayout = ({ children }: PropsWithChildren) => {
  return <div className={cx("rootlayout")}>{children}</div>;
};
