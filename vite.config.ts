import { defineConfig } from "vite";

import path from "path";

export default (/** if you want to use mode : { mode }*/) => {
  return defineConfig({
    resolve: {
      extensions: [".js", ".ts"],
    },
    build: {
      target: ["es2015"],
      outDir: "util",
      lib: {
        entry: path.resolve(__dirname, "./src/index.ts"),
        formats: ["es", "cjs"],
        fileName: "main",
      },
    },
  });
};