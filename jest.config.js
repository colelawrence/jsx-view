// const { pathsToModuleNameMapper } = require("ts-jest/utils")
// const { compilerOptions } = require("./tsconfig.json")
const path = require("path")

module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  verbose: true,
  setupFiles: [
    // "<rootDir>/src/_mocks.ts",
  ],
  moduleNameMapper: {
    // ...pathsToModuleNameMapper(compilerOptions.paths, { prefix: "<rootDir>/" }),
  },
  testEnvironment: "jsdom",
  // testPathIgnorePatterns: ["_todo/*"],
  globals: {
    "ts-jest": {
      tsconfig: path.join(__dirname, "./tsconfig.json"),
    },
  },
}
