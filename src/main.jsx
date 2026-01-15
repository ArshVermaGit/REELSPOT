
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import ErrorBoundary from './components/shared/ErrorBoundary'
import './styles/index.css'

console.log('Imports done');

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
  console.log('Root render called');
} catch (e) {
  console.error('CRASH IN MAIN.JSX:', e);
}
