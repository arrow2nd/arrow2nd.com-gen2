import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';
import path from 'path';

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    environment: 'happy-dom',
    globals: true,
    mockReset: true,
    // setupFiles: ['./vitest.setup.ts'], // Re-evaluating if this is needed with alias
  },
  resolve: {
    alias: {
      // Alias 'astro:content' to our mock implementation
      'astro:content': path.resolve(__dirname, 'src/__mocks__/astro-content.ts'),
    },
  },
});
