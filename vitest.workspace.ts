import { defineWorkspace } from 'vitest/config'

export default defineWorkspace([
  {
    extends: './packages/enhanced-inputs/vitest.config.ts',
    test: {
      name: 'enhanced-inputs',
      root: './packages/enhanced-inputs',
    },
  },
])
