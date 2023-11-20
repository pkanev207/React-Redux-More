import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// import eslint from "vite-plugin-eslint";

// https://vitejs.dev/config/
export default defineConfig({
  // publicDir: "./public",
  assetsInclude: ["**/*.m4a"],
  plugins: [
    react(),
    // eslint()
  ],
  // smth: false,
});
