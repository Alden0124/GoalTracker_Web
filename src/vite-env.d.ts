/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_GOOGLE_CLIENT_ID: string;
  readonly VITE_LINE_CLIENT_ID: string;
  readonly MODE: string;
  readonly PROD: boolean;
  readonly DEV: boolean;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: "development" | "production";
    VITE_API_URL: string;
    VITE_GOOGLE_CLIENT_ID: string;
    VITE_LINE_CLIENT_ID: string;
  }
}
