import type { ErrorInfo, ReactNode } from "react";
import { Component } from "react";

interface State {
  hasError: boolean;
}

interface Props {
  errorComponent: ReactNode;
  children: ReactNode;
  /**
   * onError에서 callback으로 받은 error, errorInfo를 이용하여 에러를 수집합니다.
   * ex) sentry, datadog 등
   * */
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

class GlobalErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.props.onError?.(error, errorInfo);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return this.props.errorComponent;
    }

    return this.props.children;
  }
}

export default GlobalErrorBoundary;
