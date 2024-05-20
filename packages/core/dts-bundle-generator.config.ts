const config = {
  entries: [
    {
      filePath: "./src/index.ts",
      outFile: `./dist/index.d.ts`,
      noCheck: false,
      libraries: {
        importedLibraries: ["csstype"],
      },
    },
  ],
};

module.exports = config;
