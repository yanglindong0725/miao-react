import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

/**
 * @param {Object} options
 * @param {number} [options.port]
 * @param {string} [options.root]
 * @returns {import('vite').UserConfig}
 */
export function createViteConfig(options = {}) {
  const root = options.root || process.cwd();

  return defineConfig({
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(root, "./src"),
      },
    },
    server: {
      port: options.port || 3000,
    },
    build: {
      sourcemap: true,
      target: "es2022",
    },
  });
}
