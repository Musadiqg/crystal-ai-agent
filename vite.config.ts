import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Production base = GitHub project page: https://<user>.github.io/<repo>/
// Repo: https://github.com/Musadiqg/crystal-ai-agent → base must match repo name.
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  base: mode === "production" ? "/crystal-ai-agent/" : "/",
}));
