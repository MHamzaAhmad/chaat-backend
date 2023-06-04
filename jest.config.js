import { createRequire } from "module";

const require = createRequire(import.meta.url);

export default {
  testEnvironment: "node",
  moduleFileExtensions: ["js", "mjs"],
  testMatch: ["**/__tests__/**/*.js", "**/__tests__/**/*.mjs"],
  transform: {},
  collectCoverage: false,
  coverageReporters: ["text", "lcov"],
  collectCoverageFrom: ["src/**/*.js", "src/**/*.mjs"],
  setupFiles: ["dotenv/config"],
  coveragePathIgnorePatterns: ["/node_modules/"],
};
