import type { Config } from "jest";
import { defaults } from "jest-config";

const config: Config = {
  moduleFileExtensions: [...defaults.moduleFileExtensions, "mts"],
  // setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  preset: "ts-jest",
  moduleNameMapper: { "^.+\\.css$": "<rootDir>/CSSStub.ts" },
  // testEnvironment: "jsdom",
  testPathIgnorePatterns: ["/__tests__/helpers/*"]
};

export default config;
