import { fileURLToPath } from 'node:url';
import { configDefaults, defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './packages/enhanced-inputs/vite.config';

export default mergeConfig(
    viteConfig,
    defineConfig({
        test: {
            workspace: [
                {
                    extends: true,
                    test: {
                        name: 'unit',
                        environment: 'happy-dom',
                        include: ['./**/*.test.ts'],
                        exclude: [...configDefaults.exclude, './**/*.browser.test.ts']
                    }
                },
                {
                    extends: true,

                    test: {
                        name: 'browser',
                        include: ['./**/*.browser.test.ts'],
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
