/// <reference types="vitest" />
// import react from '@vitejs/plugin-react';
import path from "path";
import { defineConfig } from "vite";
import packageJson from "./package.json";

const getPackageName = () => {
  return packageJson.name.replace(/@/g, "").replace(/\//g, "-");
};

const fileName = {
  es: `${getPackageName()}.mjs`,
  cjs: `${getPackageName()}.cjs`,
};

module.exports = defineConfig({
  base: "./",
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./test/setup.ts",
    watch: false,
    coverage: {
      include: ["src/**/*.{ts,tsx}"],
    },
  },
  resolve: {
    alias: [
      { find: "@", replacement: path.resolve(__dirname, "src") },
      { find: "@@", replacement: path.resolve(__dirname) },
    ],
  },
  build: {
    outDir: "./dist",
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      formats: ["es", "cjs"],
      fileName: format => fileName[format],
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ["react", "react-dom", "react/jsx-runtime"],
    },
    sourcemap: true,
    // minify: false,
    // terserOptions: {
    //   compress: false,
    //   mangle: false,
    // },
  },
});
