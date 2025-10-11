import { createViteConfig } from "@miao/vite-config";
import tailwindcss from "@tailwindcss/vite";

export default createViteConfig({
  port: 3000,
  root: __dirname,
  plugins: [tailwindcss()],
});
