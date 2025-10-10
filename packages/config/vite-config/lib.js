import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import dts from "vite-plugin-dts";
import path from "path";

/**
 * @param {Object} options
 * @param {string} options.entry
 * @param {string} options.name
 * @param {string[]} [options.external]
 * @returns {import('vite').UserConfig}
 */
export function createLibConfig(options) {
  return defineConfig({
    plugins: [
      react(),
      dts({
        insertTypesEntry: true,
        tsconfigPath: "./tsconfig.json",
      }),
    ],
    build: {
      lib: {
        entry: path.resolve(process.cwd(), options.entry),
        name: options.name,
        formats: ["es"],
        fileName: "index",
      },
      rollupOptions: {
        external: options.external || ["react", "react-dom"],
        output: {
          globals: {
            react: "React",
            "react-dom": "ReactDOM",
          },
        },
      },
    },
  });
}
