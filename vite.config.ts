import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  server: {
    proxy: {
      "/api": {
        target: "https://loripsum.net/",
        changeOrigin: true,
        secure: false,
        ws: true,
      },
    },
  },
});
