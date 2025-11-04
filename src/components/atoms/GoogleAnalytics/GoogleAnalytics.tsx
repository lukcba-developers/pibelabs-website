import { useEffect } from 'react';
import { initGA, sendPageView } from '@/lib/analytics/googleAnalytics';

/* ============================================
   Google Analytics Component (Atom)
   ============================================ */

interface GoogleAnalyticsProps {
  measurementId?: string;
  enablePageViews?: boolean;
}

/**
 * Componente que inicializa Google Analytics 4
 *
 * Uso:
 * <GoogleAnalytics measurementId="G-XXXXXXXXXX" />
 *
 * O usando variable de entorno:
 * <GoogleAnalytics /> (lee VITE_GA_MEASUREMENT_ID)
 */
const GoogleAnalytics = ({
  measurementId,
  enablePageViews = true,
}: GoogleAnalyticsProps) => {
  useEffect(() => {
    // Inicializar GA
    initGA(measurementId);

    // Enviar pageview inicial si está habilitado
    if (enablePageViews) {
      sendPageView();

      // Trackear cambios de ruta (para SPAs)
      const handleRouteChange = () => {
        sendPageView();
      };

      // Escuchar cambios en el hash (para navegación con #)
      window.addEventListener('hashchange', handleRouteChange);

      return () => {
        window.removeEventListener('hashchange', handleRouteChange);
      };
    }

    return undefined;
  }, [measurementId, enablePageViews]);

  // Este componente no renderiza nada
  return null;
};

export default GoogleAnalytics;
