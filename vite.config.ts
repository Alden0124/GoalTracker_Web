import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react()],
    define: {
      "import.meta.env": JSON.stringify(env),
    },
    resolve: {
      alias: [
        {
          find: "@",
          replacement: path.resolve(process.cwd(), "src"),
        },
      ],
    },
    build: {
      sourcemap: true,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ["react", "react-dom"],
          },
        },
      },
    },
    server: {
      port: 10000,
      host: "0.0.0.0",
      proxy: {
        "/api": {
          target: process.env.VITE_API_URL || "http://localhost:3001/",
          changeOrigin: true,
        },
      },
    },
    preview: {
      port: 10000,
      host: "0.0.0.0",
    },
  };
});
