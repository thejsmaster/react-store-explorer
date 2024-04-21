import React, { Component, ReactNode } from "react";
interface ErrorBoundaryProps {
  Error: (error: Error, message: string) => ReactNode;
  children?: any;
}
export const ErrorComponent = ({ Error, message }: any) => {
  return (
    <span title={Error?.stack || ""} style={{ color: "red" }}>
      {message}
    </span>
  );
};

interface ErrorBoundaryState {
  error: Error | null;
  errorMessage: string;
}
export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      error: null,
      errorMessage: "",
    };
  }

  componentDidCatch(error: Error) {
    this.setState({
      error,
      errorMessage: error.message,
    });
  }

  render() {
    const { error, errorMessage } = this.state;
    const { Error }: any = this.props;

    if (error) {
      return <Error error={error} message={errorMessage} />;
    }

    return this.props && this.props.children ? (
      <>{this.props.children}</>
    ) : (
      <>Error</>
    );
  }
}
