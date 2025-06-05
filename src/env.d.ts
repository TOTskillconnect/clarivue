/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly MODE: string;
  readonly DEV: boolean;
  readonly PROD: boolean;
  readonly VITE_API_URL: string;
  readonly OPENAI_API_KEY: string;
  readonly VITE_ERROR_LOGGING_ENDPOINT: string;
  readonly VITE_ENABLE_ANALYTICS: string;
  readonly VITE_ENABLE_ERROR_REPORTING: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
} 