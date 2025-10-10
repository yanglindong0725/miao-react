import miaoConfig from "@miao/eslint-config/react.js";

export default [
  ...miaoConfig,
  {
    ignores: ["dist", "node_modules"],
  },
];
