import { createDefaultPreset } from 'ts-jest';

const customPreset = createDefaultPreset({
  extensionsToTreatAsEsm: ['.ts'],
  useESM: true, // Enables ESM support
});

export default {
  ...customPreset,  // Spread the generated preset
  testEnvironment: 'node',
  testPathIgnorePatterns: ["./node_modules", "./dist"],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
};