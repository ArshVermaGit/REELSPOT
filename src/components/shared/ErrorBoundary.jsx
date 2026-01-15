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
          <div className="w-20 h-20 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-red-100">
             <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
          </div>
          <h1 className="text-3xl font-[900] text-zinc-900 mb-2 tracking-tight">Oops! Critical Error</h1>
          <p className="mb-8 text-zinc-500 max-w-md mx-auto leading-relaxed">
            We apologize for the inconvenience. The application encountered an unexpected state.
          </p>
          
          {/* Dev Details */}
          {import.meta.env.DEV && (
             <details className="mb-8 w-full max-w-lg bg-white p-4 rounded-xl border border-zinc-200 text-left overflow-auto shadow-sm max-h-60 scrollbar-thin">
                 <summary className="cursor-pointer text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                    <span>View Stack Trace</span>
                    <span className="h-px bg-zinc-100 flex-1"></span>
                 </summary>
                 <pre className="text-[11px] text-red-600 font-mono whitespace-pre-wrap leading-relaxed">
                    {this.state.error?.toString()}
                    {this.state.error?.stack}
                 </pre>
             </details>
          )}

          <div className="flex flex-col sm:flex-row gap-3 w-full max-w-xs">
            <button
                onClick={() => window.location.reload()}
                className="flex-1 px-6 py-3 bg-black text-white font-bold rounded-xl hover:scale-[1.02] transition-transform shadow-xl shadow-black/10 flex items-center justify-center gap-2"
            >
                Try Again
            </button>
              <button
                onClick={() => window.location.href = '/'}
                className="flex-1 px-6 py-3 bg-white border border-zinc-200 text-zinc-600 font-bold rounded-xl hover:bg-zinc-50 hover:text-black transition-colors"
            >
                Go Home
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
