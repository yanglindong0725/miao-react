import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

/**
 * @param {Object} options
 * @param {number} [options.port]
 * @param {string} [options.root]
 * @param {Array} [options.plugins] - 额外的 Vite 插件
 * @returns {import('vite').UserConfig}
 */
export function createViteConfig(options = {}) {
  const root = options.root || process.cwd();
  const extraPlugins = options.plugins || [];

  return defineConfig({
    plugins: [react(), ...extraPlugins],
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
