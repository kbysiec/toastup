import path from "path";

export default {
  test: {
    globals: true,
    watch: false,
    environment: "jsdom",
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
};
