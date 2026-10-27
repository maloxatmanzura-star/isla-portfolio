import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// base "./" keeps asset paths relative, so the same build works on
// Vercel, Netlify and GitHub Pages (including /repo-name/ sub-paths).
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "./",
  build: {
    rollupOptions: {
      output: { manualChunks: { three: ["three", "@react-three/fiber"] } },
    },
  },
});
