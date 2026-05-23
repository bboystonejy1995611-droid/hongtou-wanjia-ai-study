import { defineConfig } from "vitest/config";
import { fileURLToPath } from "node:url";

export default defineConfig({
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  test: {
    environment: "jsdom",
    exclude: [
      "**/node_modules/**",
      "**/.next/**",
      "**/out/**",
      "**/release/**",
      "**/红头顽家AI学习助手-电脑增强版/**",
    ],
  },
});
