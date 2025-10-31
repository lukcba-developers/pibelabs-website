import { Component, ErrorInfo, ReactNode } from 'react';

/* ============================================
   Error Boundary Component (Atom)
   ============================================ */

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-dark-primary flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-dark-secondary border-2 border-red-500 rounded-lg p-8 text-center">
            <h1 className="text-2xl font-orbitron font-bold text-red-500 mb-4">
              Oops! Algo salió mal
            </h1>
            <p className="text-gray-300 font-poppins mb-6">
              Lo sentimos, ha ocurrido un error inesperado.
            </p>
            {this.state.error && (
              <pre className="text-left text-xs bg-dark-primary p-4 rounded border border-gray-700 overflow-auto mb-6 text-gray-400">
                {this.state.error.message}
              </pre>
            )}
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-cyan-neon text-dark-primary font-rajdhani font-bold rounded-lg hover:bg-cyan-bright transition-colors"
            >
              Recargar Página
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
