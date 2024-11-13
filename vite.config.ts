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
    port: 10000, // 開發伺服器端口
    host: "0.0.0.0", // 允許外部訪問
  },
  preview: {
    port: 10000, // 預覽伺服器端口
    host: "0.0.0.0", // 允許外部訪問
  },
});
