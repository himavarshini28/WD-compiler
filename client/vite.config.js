import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
  },
  server: {
    host: true,
    port: 3000,
    strictPort: true,
  },
  // This ensures SPA routing works on production build
  preview: {
    port: 3000,
  },
});
