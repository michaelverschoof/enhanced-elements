import { playwright } from '@vitest/browser-playwright';
import { fileURLToPath } from 'node:url';
import { configDefaults, defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config';

export default mergeConfig(
    viteConfig,
    defineConfig({
        test: {
            projects: [
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
                            provider: playwright(),
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
                    '**/*.test.browser.ts',
                    '**/index.ts',
                    '**/types.ts',
                    '**/tsdown.config.ts',
                    '**/dist',
                    '**/test/**',
                    'packages/playground/'
                ]
            }
        }
    })
);
