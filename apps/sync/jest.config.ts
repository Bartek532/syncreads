import type { Config } from "jest";

const config: Config = {
  verbose: true,
  rootDir: "./",
  coverageDirectory: "<rootDir>/coverage",
  moduleFileExtensions: ["js", "json", "ts"],
  testRegex: ".*\\.spec\\.ts$",
  transform: {
    "^.+\\.(t|j)s$": "ts-jest",
  },
  collectCoverageFrom: ["**/*.(t|j)s"],
  testEnvironment: "node",
  passWithNoTests: true,
};

export default config;
