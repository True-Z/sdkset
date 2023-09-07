import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environmentMatchGlobs: [
      ['**/*.node.test.ts', 'node'],
      ['**/*.browser.test.ts', 'jsdom']
    ]
  }
})
