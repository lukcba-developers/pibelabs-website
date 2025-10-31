import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/globals.css';
import { initAnalytics } from './lib/analytics';
import { logPerformanceMetrics } from './lib/performance';

// Initialize analytics
initAnalytics();

// Log performance metrics in development
if (import.meta.env.DEV) {
  window.addEventListener('load', () => {
    setTimeout(logPerformanceMetrics, 0);
  });
}

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Failed to find the root element');
}

ReactDOM.createRoot(rootElement).render(
  <App />
);
