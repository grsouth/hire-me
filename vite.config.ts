import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Use relative paths so the app works when served from a subpath (e.g., GitHub Pages).
export default defineConfig({
  base: "./",
  plugins: [react()],
});
