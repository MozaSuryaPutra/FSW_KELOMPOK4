import { defineConfig } from "vite";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
//import path from "path";

export default defineConfig({
  plugins: [TanStackRouterVite(), react()],
});
