import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import ErrorBoundary from './components/ErrorBoundary'

// Global error hook to ensure errors are visible in the console for deployed sites
// eslint-disable-next-line no-console
window.addEventListener('error', (event) => console.error('Global error:', event.error || event.message));
// eslint-disable-next-line no-console
window.addEventListener('unhandledrejection', (ev) => console.error('Unhandled promise rejection:', ev.reason));

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
)
