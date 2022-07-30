// @ts-check
// const { pathsToModuleNameMapper } = require("ts-jest/utils")
// const { compilerOptions } = require("./tsconfig.json")
const path = require("path")

/** @type {import("jest").Config}*/
module.exports = {
  verbose: true,
  setupFiles: [],
  testEnvironment: "jsdom",

  transform: {
    "^.+\\.(t|j)sx?$": [
      "@swc/jest",
      {
        /** @type {import('@swc/core').JscConfig} */
        jsc: {
          transform: {
            react: {
              runtime: "automatic",
              importSource: "jsx-view",
            },
          },
        },
      },
    ],
  },
  // testPathIgnorePatterns: ["_todo/*"]
}
