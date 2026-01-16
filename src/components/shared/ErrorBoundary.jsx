import React from 'react';
import ServerError from '../../pages/ServerError';

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
      if (import.meta.env.DEV) {
          return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-50 p-6 text-center animate-fade-in">
              <h1 className="text-3xl font-[900] text-zinc-900 mb-2 tracking-tight">Dev: Critical Error</h1>
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
             <button onClick={() => window.location.reload()} className="px-6 py-3 bg-black text-white font-bold rounded-xl">Retry</button>
            </div>
          )
      }
      return <ServerError />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
