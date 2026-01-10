import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-4 text-center">
          <h1 className="text-3xl font-bold mb-4 text-destructive">Something went wrong.</h1>
          <p className="mb-4 text-muted-foreground">We apologize for the inconvenience.</p>
          <pre className="bg-muted p-4 rounded text-sm text-left overflow-auto max-w-full mb-6">
            {this.state.error?.toString()}
          </pre>
          <button
            onClick={() => window.location.reload()}
            className="bg-primary text-primary-foreground px-4 py-2 rounded hover:bg-primary/90"
          >
            Refresh Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
