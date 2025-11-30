import React from 'react';

interface State {
  hasError: boolean;
  error?: Error | null;
}

class ErrorBoundary extends React.Component<{ children: React.ReactNode }, State> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: any) {
    // Log the error to the console for easier debugging on deployed sites
    // Future: send this to a logging endpoint
    // eslint-disable-next-line no-console
    console.error('Unhandled error caught by ErrorBoundary:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
          <div className="max-w-2xl text-center p-8">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Something went wrong</h1>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              The app encountered an unexpected error. Refresh the page or check the browser console for details. If this persists after a redeploy, share the console error with the dev team.
            </p>
            <details className="text-left text-sm text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 p-4 rounded-md">
              <summary className="cursor-pointer">Error details</summary>
              <pre className="whitespace-pre-wrap break-words mt-2">{String(this.state.error)}</pre>
            </details>
          </div>
        </div>
      );
    }

    return this.props.children as React.ReactElement;
  }
}

export default ErrorBoundary;
