import ReactDOM from "react-dom/client";
import App from "./App";

// Auto-hosted Google Fonts for better performance
import "@fontsource/orbitron/400.css";
import "@fontsource/orbitron/700.css";
import "@fontsource/orbitron/800.css";
import "@fontsource/orbitron/900.css";
import "@fontsource/rajdhani/300.css";
import "@fontsource/rajdhani/400.css";
import "@fontsource/rajdhani/500.css";
import "@fontsource/rajdhani/600.css";
import "@fontsource/rajdhani/700.css";
import "@fontsource/poppins/300.css";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";

import "./styles/globals.css";
import { initGA } from "./lib/analytics";
import { logPerformanceMetrics } from "./lib/performance";

// Initialize analytics
initGA();

// Log performance metrics in development
if (import.meta.env.DEV) {
  window.addEventListener("load", () => {
    setTimeout(logPerformanceMetrics, 0);
  });
}

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Failed to find the root element");
}

ReactDOM.createRoot(rootElement).render(<App />);
