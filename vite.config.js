import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  // publicDir: "./public",
  assetsInclude: ["**/*.m4a"],
  plugins: [react()],
  // smth: false,
});
