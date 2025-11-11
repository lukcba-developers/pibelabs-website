import { Component, ErrorInfo, ReactNode } from "react";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";

/* ============================================
   Error Boundary Component (Atom)
   ============================================ */

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Log error to console in development
    if (import.meta.env.DEV) {
      console.error("ErrorBoundary caught an error:", error, errorInfo);
    }

    // Call custom error handler if provided
    this.props.onError?.(error, errorInfo);

    // Update state with error info
    this.setState({
      errorInfo,
    });

    // TODO: Send to error tracking service (Sentry, LogRocket, etc.)
    // Example: Sentry.captureException(error, { extra: errorInfo });
  }

  handleReset = (): void => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  handleGoHome = (): void => {
    window.location.href = "/";
  };

  render(): ReactNode {
    if (this.state.hasError) {
      // Use custom fallback if provided
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default error UI with PibeLabs design
      return (
        <div className="min-h-screen bg-gradient-to-br from-dark-primary via-dark-secondary to-dark-primary flex items-center justify-center p-4">
          <div className="max-w-2xl w-full bg-dark-secondary border-2 border-cyan-neon/30 rounded-2xl p-8 md:p-12 text-center">
            {/* Error Icon */}
            <div className="inline-flex items-center justify-center w-24 h-24 bg-magenta-neon/20 rounded-full mb-6">
              <AlertTriangle size={48} className="text-magenta-neon" />
            </div>

            {/* Title */}
            <h1 className="font-orbitron font-bold text-3xl md:text-4xl text-white mb-4">
              ¡Oops! Algo salió mal
            </h1>

            {/* Description */}
            <p className="font-poppins text-lg text-gray-300 mb-8">
              Lo sentimos, hemos encontrado un error inesperado. No te
              preocupes, nuestro equipo ha sido notificado y está trabajando en
              ello.
            </p>

            {/* Error Details (only in development) */}
            {import.meta.env.DEV && this.state.error && (
              <details className="text-left mb-8 bg-dark-primary/50 rounded-lg p-4 border border-cyan-neon/20">
                <summary className="font-rajdhani font-semibold text-cyan-neon cursor-pointer mb-2">
                  Detalles del error (dev only)
                </summary>
                <div className="font-mono text-xs text-gray-400 overflow-auto max-h-48">
                  <p className="text-magenta-neon mb-2">
                    {this.state.error.toString()}
                  </p>
                  {this.state.errorInfo && (
                    <pre className="whitespace-pre-wrap">
                      {this.state.errorInfo.componentStack}
                    </pre>
                  )}
                </div>
              </details>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={this.handleReset}
                className="flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-neon to-cyan-bright text-white font-rajdhani font-bold text-lg rounded-xl hover:shadow-glow-cyan transition-all"
              >
                <RefreshCw size={20} />
                Intentar nuevamente
              </button>

              <button
                onClick={this.handleGoHome}
                className="flex items-center justify-center gap-2 px-8 py-4 bg-transparent border-2 border-cyan-neon/50 text-cyan-neon font-rajdhani font-bold text-lg rounded-xl hover:bg-cyan-neon/10 transition-all"
              >
                <Home size={20} />
                Ir al inicio
              </button>
            </div>

            {/* Support Info */}
            <p className="font-poppins text-sm text-gray-400 mt-8">
              Si el problema persiste, contáctanos en{" "}
              <a
                href="mailto:contact@pibelabs.com"
                className="text-cyan-neon hover:underline"
              >
                contact@pibelabs.com
              </a>
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
