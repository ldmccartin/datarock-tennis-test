import { createDefaultPreset } from "ts-jest";

const customPreset = createDefaultPreset({
  extensionsToTreatAsEsm: [".ts"],
  useESM: true,
});

export default {
  ...customPreset,
  testEnvironment: "node",
  testPathIgnorePatterns: ["./node_modules", "./dist"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
};
