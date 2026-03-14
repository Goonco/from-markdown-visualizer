import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), tsconfigPaths()],
  base: "/from-markdown-visualizer/",
  build: {
    rollupOptions: {
      output: {
        sanitizeFileName(name) {
          return name.replace(/^_/, "");
        },
      },
    },
  },
});
