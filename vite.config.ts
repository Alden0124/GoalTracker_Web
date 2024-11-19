import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: "@",
        replacement: path.resolve(process.cwd(), "src"),
      },
    ],
  },
  server: {
    port: 10000,
    host: "0.0.0.0",
    proxy: {
      '/api': {
        target: 'http://localhost:3001/',
        changeOrigin: true,
      }
    }
  },
  preview: {
    port: 10000,
    host: "0.0.0.0",
  },
});
