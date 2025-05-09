import { fileURLToPath } from 'node:url';
import { configDefaults, defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './packages/enhanced-inputs/vite.config';

export default mergeConfig(
    viteConfig,
    defineConfig({
        test: {
            environment: 'happy-dom',
            exclude: [...configDefaults.exclude, 'e2e/**'],
            root: fileURLToPath(new URL('./', import.meta.url)),
            coverage: {
                exclude: [
                    ...(configDefaults.coverage.exclude ?? []),
                    './playground',
                    '**/index.ts',
                    '**/main.ts',
                    '**/types.ts'
                ]
            }
        }
    })
);
