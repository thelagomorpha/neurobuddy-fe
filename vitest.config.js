import { fileURLToPath } from "node:url";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

const rootDir = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": rootDir
    }
  },
  esbuild: {
    include: /\.jsx?$/,
    jsx: "automatic"
  },
  test: {
    environment: "node",
    coverage: {
      all: false,
      include: ["app/**/*.js", "src/**/*.js", "next.config.mjs"],
      exclude: [
        "**/__tests__/**",
        "**/*.test.js",
        "**/.next/**",
        "**/coverage/**",
        "**/node_modules/**"
      ]
    }
  }
});
