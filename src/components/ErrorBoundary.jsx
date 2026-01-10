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
        <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-50 p-6 text-center animate-fade-in">
          <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mb-6">
             <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
          </div>
          <h1 className="text-3xl font-extrabold text-zinc-900 mb-2">Oops! Something went wrong.</h1>
          <p className="mb-8 text-zinc-500 max-w-md mx-auto">
            We apologize for the inconvenience. Our team has been notified.
            <br/>Please try refreshing the page.
          </p>
          
          {/* Dev Details */}
          {process.env.NODE_ENV === 'development' && (
             <details className="mb-8 w-full max-w-lg bg-white p-4 rounded-xl border border-zinc-200 text-left overflow-auto shadow-sm">
                 <summary className="cursor-pointer text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">Error Details</summary>
                 <pre className="text-xs text-red-600 font-mono whitespace-pre-wrap">
                    {this.state.error?.toString()}
                 </pre>
             </details>
          )}

          <div className="flex gap-4">
              <button
                onClick={() => window.location.href = '/'}
                className="px-6 py-3 bg-white border border-zinc-200 text-zinc-700 font-bold rounded-xl hover:bg-zinc-50 transition-colors"
            >
                Go Home
            </button>
            <button
                onClick={() => window.location.reload()}
                className="px-6 py-3 bg-black text-white font-bold rounded-xl hover:scale-105 transition-transform shadow-lg shadow-black/10"
            >
                Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
