
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import ErrorBoundary from './components/shared/ErrorBoundary'
import './styles/index.css'

try {
  const rootElement = document.getElementById('root');
  if (!rootElement) throw new Error("Root element not found");

  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </React.StrictMode>,
  )
} catch (e) {
  // Use console.error only as a last resort for critical boot failures
  console.error('[CRITICAL] Application failed to mount:', e);
}
