import { PropsWithChildren, Suspense } from "react";
import GlobalErrorBoundary from "./ErrorBoundary";

export const AsyncBoundary = ({ children }: PropsWithChildren) => {
  return (
    <GlobalErrorBoundary errorComponent={<></>}>
      <Suspense fallback={<></>}>{children}</Suspense>
    </GlobalErrorBoundary>
  );
};
