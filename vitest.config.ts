import { fileURLToPath } from 'node:url';
import { configDefaults, defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './packages/inputs/vite.config';

export default mergeConfig(
    viteConfig,
    defineConfig({
        test: {
            workspace: [
                {
                    extends: true,
                    test: {
                        name: 'unit',
                        environment: 'jsdom',
                        include: ['./**/*.test.ts']
                    }
                },
                {
                    extends: true,
                    test: {
                        name: 'browser',
                        environment: 'jsdom',
                        include: ['./**/*.test.browser.ts'],
                        browser: {
                            provider: 'playwright',
                            enabled: true,
                            headless: true,
                            screenshotFailures: false,
                            instances: [{ browser: 'chromium' }]
                        }
                    }
                }
            ],

            environment: 'jsdom',
            exclude: [...configDefaults.exclude, 'e2e/**'],
            root: fileURLToPath(new URL('./', import.meta.url)),
            coverage: {
                exclude: [
                    ...(configDefaults.coverage.exclude ?? []),
                    './playground',
                    '**/index.ts',
                    '**/main.ts',
                    '**/types.ts',
                    '**/dist',
                    'packages/playground/'
                ]
            }
        }
    })
);
