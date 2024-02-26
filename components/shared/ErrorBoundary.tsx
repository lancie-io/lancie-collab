import { AlertCircle } from 'lucide-react';
import React, { ReactNode } from 'react';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';

interface ErrorBoundaryProps {
  info?: string;
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: any;
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);

    // Define a state variable to track whether there is an error or not
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: any) {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error: error };
  }

  componentDidCatch(error: any, errorInfo: any) {
    // You can use your own error logging service here
    console.log({ error, errorInfo });
  }

  render() {
    // Check if an error is thrown
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <Alert variant="destructive" className="w-full bg-red-500/20">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error in module: {this.state.hasError}</AlertTitle>
          <AlertDescription>
            An error occurred. The Lancie developer team has been notified. We
            are working on it.
            <pre>Error: {JSON.stringify(this.state.error, null, 2)}</pre>
          </AlertDescription>
          {/* <pre>{JSON.stringify(this.props.children, null, 2)}</pre> */}
        </Alert>
      );
    }

    // Return children components in case of no error
    return this.props.children;
  }
}

export default ErrorBoundary;
