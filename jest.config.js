import { createDefaultPreset } from 'ts-jest';

const customPreset = createDefaultPreset({
  extensionsToTreatAsEsm: ['.ts'],
  useESM: true, // Enables ESM support
});

export default {
  ...customPreset,  // Spread the generated preset
  testEnvironment: 'node',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
};