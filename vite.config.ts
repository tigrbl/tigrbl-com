import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("/prismjs/")) return "syntax-vendor";
          if (id.includes("node_modules")) return "react-vendor";
          if (id.includes("source-snapshot.json")) return "content";
        },
      },
    },
  },
});
