import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: true,
    allowedHosts: [
      "alfajorllc.com",
      "www.alfajorllc.com",
      "localhost",
    ],
  },
  build: {
    rollupOptions: {
      external: ["prop-types"],
    },
  },
});
