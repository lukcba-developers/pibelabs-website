/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_ENV: string;
  readonly VITE_GA_ID?: string;
  readonly VITE_FB_PIXEL_ID?: string;
  readonly VITE_ANALYTICS_ID?: string;
  readonly VITE_GA_MEASUREMENT_ID?: string;
  readonly DEV: boolean;
  readonly PROD: boolean;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
