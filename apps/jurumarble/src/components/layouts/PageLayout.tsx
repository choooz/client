import { PropsWithChildren } from "react";
import styles from "./styles.module.css";

export const PageLayout = ({ children }: PropsWithChildren) => {
  return <div className={styles.rootlayout}>{children}</div>;
};
